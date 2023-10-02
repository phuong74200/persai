import { faker } from "@faker-js/faker";

import generateFilledArray from "@/utils/generate-filled-array";

export const studySets = generateFilledArray(10, () => ({
  id: faker.string.uuid(),
  sides: [
    {
      id: faker.string.uuid(),
      content: faker.lorem.paragraphs(),
    },
    {
      id: faker.string.uuid(),
      content: faker.lorem.paragraphs(),
    },
  ],
}));
