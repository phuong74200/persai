/**
 * @module PermissonComponent
 * @description
 * This module is used to render component based on permission
 * As same as `PermissonRoute` but this file is use array to render instead of object.
 * With this way user don't need to know the key of component
 */

import { ReactNode } from "react";

const defaultFallbackElement = (
  <p>
    Not found. Put fallBackElement into `PermissonComponent` instance to custom your fallbackElement
  </p>
);

export default class PermissonComponent<P extends string[]> {
  #permissons;
  #fallbackElement;
  #usePermission;

  constructor({
    permissons = [] as unknown as P,
    fallbackElement = defaultFallbackElement,
    usePermission = () => [] as unknown as P,
  }: {
    permissons?: P;
    fallbackElement?: ReactNode;
    usePermission?: () => P;
  }) {
    this.#permissons = permissons;
    this.#fallbackElement = fallbackElement;
    this.#usePermission = usePermission;
  }

  get Switch() {
    type Fn = (permisson: P) => boolean;

    return ({
      render,
    }: {
      render: {
        element: ReactNode;
        condition: boolean | Fn;
      }[];
    }) => {
      const permission = this.#usePermission() || [];

      for (const r of render) {
        const result =
          typeof r.condition === "function" ? (r.condition as Fn)(permission) : r.condition;

        if (result) return r.element;
      }

      return this.#fallbackElement;
    };
  }
}
