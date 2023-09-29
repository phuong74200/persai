import { ReactNode } from "react";

const defaultFallbackElement = (
  <p>
    Not found. Put fallBackElement into `PermissonComponent` instance to custom your fallbackElement
  </p>
);

export default class PermissonComponent<T extends Record<string, ReactNode>, P extends string[]> {
  #componentStore;
  #permissons;
  #fallbackElement;
  #usePermission;

  constructor({
    componentStore = {} as T,
    permissons = [] as unknown as P,
    fallbackElement = defaultFallbackElement,
    usePermission = () => [] as unknown as P,
  }: {
    componentStore?: T;
    permissons?: P;
    fallbackElement?: ReactNode;
    usePermission?: () => P;
  }) {
    this.#componentStore = componentStore;
    this.#permissons = permissons;
    this.#fallbackElement = fallbackElement;
    this.#usePermission = usePermission;
  }

  get Switch() {
    type Fn = (permisson: P) => boolean;

    return ({ render }: { render: { [key in keyof T]?: boolean | Fn } }) => {
      const permission = this.#usePermission() || [];

      for (const key in render) {
        const result =
          typeof render[key] === "function" ? (render[key] as Fn)(permission) : render[key];

        if (result) return this.#componentStore[key];
      }

      return this.#fallbackElement;
    };
  }
}
