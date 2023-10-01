import { faker } from "@faker-js/faker";

import generateFilledArray from "@/utils/generate-filled-array";

export const studySets = generateFilledArray(10, () => ({
  id: faker.string.uuid(),
  name: "Study Set 1",
  createdAt: "21 December 2020",
  image: faker.image.urlPicsumPhotos(),
  progress: faker.number.int({ min: 0, max: 100 }),
}));
