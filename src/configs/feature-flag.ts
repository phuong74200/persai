import { useContext } from "react";

import FeatureFlagManager, { FeatureFlagManagerType } from "@/modules/feature-flag-manager";

export enum FLAGS {
  NOTE = "note",
  EXCEL = "excel",
  LOGIN_PARTICLES = "login-particles",
}

const featureFlagManager = new FeatureFlagManager({
  [FLAGS.NOTE]: false,
  [FLAGS.EXCEL]: false,
  [FLAGS.LOGIN_PARTICLES]: false,
});

export const FeatureFlagProvider = featureFlagManager.FeatureFlagProvider;
export const FeatureFlag = featureFlagManager.FeatureFlag;
export const FeatureFlagContext = featureFlagManager.FeatureFlagContext;

export type Feature = FeatureFlagManagerType<typeof featureFlagManager>;

export const useFeatureFlagContext = () => useContext(FeatureFlagContext);
export const useFeatureFlag = featureFlagManager.useFeatureFlag;
export const useFeatureFlags = featureFlagManager.useFeatureFlags;
export const useHelper = featureFlagManager.useHelper;
