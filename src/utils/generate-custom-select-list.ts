import { shapes } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export default function generateCustomSelectList<T>(
  list: T[],
  configs: {
    label: keyof T;
    value: keyof T;
    image?: keyof T;
    description: keyof T;
    searchString: (keyof T)[];
  },
) {
  return list.map((item) => {
    const image = createAvatar(shapes, {
      seed: configs.searchString.map((key) => item[key]).join(" "),
    }).toDataUriSync();
    return {
      value: String(item[configs.value]),
      label: String(item[configs.label]),
      description: String(item[configs.description]),
      image: String(configs.image ? item[configs.image] : image),
      searchString: String(configs.searchString.map((key) => item[key]).join(" ")),
    };
  });
}
