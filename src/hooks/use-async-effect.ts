import { DependencyList, useEffect } from "react";

type Destructor = void | (() => void | Promise<void>);

const useAsyncEffect = (
  effect: () => Destructor | Promise<void>,
  dependencies: DependencyList,
): void => {
  useEffect(() => {
    let cleanup: Destructor | undefined;
    const effectPromise = effect();

    if (effectPromise instanceof Promise) {
      effectPromise.catch((error) => {
        throw Error(error);
      });
    }

    if (typeof effectPromise === "function") {
      cleanup = effectPromise;
    }

    return () => {
      if (cleanup instanceof Promise) {
        cleanup.catch((error) => {
          throw Error(error);
        });
      } else if (typeof cleanup === "function") {
        cleanup();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useAsyncEffect;
