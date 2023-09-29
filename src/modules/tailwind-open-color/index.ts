import openColor from "open-color";

const PREFIX = "oc-";

const _openColor = (function () {
  return Object.keys(openColor).reduce((acc, color) => {
    const KEY = color as keyof typeof openColor;

    const oc = openColor[KEY];

    if (typeof oc === "string") {
      return {
        ...acc,
        [PREFIX + KEY]: oc,
      };
    } else if (Array.isArray(oc)) {
      return {
        ...acc,
        [PREFIX + KEY]: oc.reduce(
          (a, v, i) => ({
            ...a,
            [i]: v,
          }),
          {},
        ),
      };
    }

    return acc;
  }, {});
})();

export default _openColor as openColor;
