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
    404 Not found. Put fallBackElement into <code>PermissonComponent</code> instance to custom your
    <code>fallbackElement</code>
  </p>
);

const defaultSuspense = (
  <p>
    Loading. Put fallBackElement into <code>PermissonComponent</code> instance to custom your
    <code>Suspense</code>
  </p>
);

/**
 * @deprecated use "auth-router" instead
 */

export default class PermissonComponent<P extends unknown[]> {
  #fallbackElement;
  #usePermission;
  #suspense;

  constructor({
    fallbackElement = defaultFallbackElement,
    usePermission = () => ({
      auth: [] as unknown as P,
      isFetching: false,
    }),
    suspense = defaultSuspense,
  }: {
    fallbackElement?: ReactNode;
    suspense?: ReactNode;
    usePermission?: () => {
      auth?: P;
      isFetching?: boolean;
    };
  }) {
    this.#fallbackElement = fallbackElement;
    this.#usePermission = usePermission;
    this.#suspense = suspense;
  }

  on(permissons: P, view: ReactNode) {
    return (availablePermissionSet: Set<P[number]>) => {
      for (const permission of permissons) if (!availablePermissionSet.has(permission)) return null;
      return view;
    };
  }

  /**
   * @deprecated
   */
  get Switch() {
    type Fn = ReturnType<typeof this.on>;

    return ({ views }: { views: Fn[] }) => {
      const { auth, isFetching } = this.#usePermission() || [];
      const permissionSet = new Set(auth);

      if (isFetching) return this.#suspense;

      for (const view of views) {
        const result = view(permissionSet);
        if (result) return result;
      }

      return this.#fallbackElement;
    };
  }
}
