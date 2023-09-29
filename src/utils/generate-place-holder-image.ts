import { faker } from "@faker-js/faker";

const urlPlaceholder = faker.image.urlPlaceholder;

export function generatePlaceHolderImage(...args: Parameters<typeof urlPlaceholder>) {
  return urlPlaceholder({
    text: `${args[0]?.width}x${args[0]?.height}`,
    backgroundColor: "#000",
    textColor: "#fff",
    ...args[0],
  });
}
