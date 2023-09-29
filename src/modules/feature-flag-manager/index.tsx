import { createContext, ReactNode, useContext, useState } from "react";

interface ProviderProps {
  children: ReactNode;
}

export default class FeatureFlagManager<T extends Record<string, boolean>> {
  private featureFlags: T;

  // if you need to get the all the features in the app,
  // use useFeatureFlags hook instead.
  // Don't mess up with this context if you don't know what you are doing
  public readonly FeatureFlagContext = createContext<{
    featureFlags: T;
    setFeatureFlags: (featureFlags: T) => void;
  }>({} as { featureFlags: T; setFeatureFlags: (featureFlags: T) => void });

  constructor(featureFlags: T) {
    this.featureFlags = featureFlags;
  }

  get features() {
    return this.featureFlags;
  }

  get FeatureFlagProvider() {
    return ({ children }: ProviderProps) => {
      const [featureFlags, setFeatureFlags] = useState<T>(this.featureFlags);

      // ensrure that the this.featureFlags is always async with the store
      this.featureFlags = featureFlags;

      return (
        <this.FeatureFlagContext.Provider value={{ featureFlags, setFeatureFlags }}>
          {children}
        </this.FeatureFlagContext.Provider>
      );
    };
  }

  get FeatureFlag() {
    return ({
      children,
      feature,
      fallbackElement = null,
    }: {
      children?: ReactNode;
      feature: (keyof T)[] | keyof T | boolean | ((...features: (keyof T)[]) => boolean);
      fallbackElement?: ReactNode;
    }) => {
      if (!feature) return null;

      const context = useContext(this.FeatureFlagContext);

      let isFeatureEnabled = false;

      // if (Array.isArray(feature)) isFeatureEnabled = this.all(...feature)();
      if (Array.isArray(feature))
        isFeatureEnabled = feature.reduce<boolean>((pre, cur) => {
          return pre && context.featureFlags[cur];
        }, true);
      else if (typeof feature === "string") isFeatureEnabled = context.featureFlags[feature];
      else if (typeof feature === "boolean") isFeatureEnabled = feature;
      else if (typeof feature === "function") {
        isFeatureEnabled = feature();
      }

      if (!isFeatureEnabled) return fallbackElement;

      return children;
    };
  }

  get useFeatureFlag() {
    return (feature: keyof T) => {
      const context = useContext(this.FeatureFlagContext);
      const setter = (value: boolean) => {
        context.setFeatureFlags({
          ...context.featureFlags,
          [feature]: value,
        });
      };
      return [context.featureFlags[feature] as boolean, setter] as const;
    };
  }

  get useFeatureFlags() {
    return () => {
      const context = useContext(this.FeatureFlagContext);
      return context.featureFlags;
    };
  }

  // check if any of the provided features is enabled
  // don't use this function directly, use the useHelper hook instead
  private get any() {
    return (...features: (keyof T)[]) =>
      () => {
        for (const feature of features) {
          if (this.featureFlags[feature] === true) return true;
        }
        return false;
      };
  }

  // check if all of the provided features is enabled
  // don't use this function directly, use the useHelper hook instead
  private get all() {
    return (...features: (keyof T)[]) =>
      () =>
        features.reduce<boolean>((pre, cur) => {
          return pre && this.featureFlags[cur];
        }, true);
  }

  // export the any and all function as a helper for inner component use
  get useHelper() {
    return (...features: (keyof T)[]) => {
      // useFeatureFlags hook there to ensure that the component
      // which use useHelper will be re-rendered
      this.useFeatureFlags();

      if (Array.isArray(features))
        return {
          any: this.any(...features),
          all: this.all(...features),
        };
      return { any: this.any, all: this.all };
    };
  }
}

export type FeatureFlagManagerType<Type> = keyof (Type extends FeatureFlagManager<infer X>
  ? X
  : never);
