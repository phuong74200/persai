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

type Choice = "multiple-choice" | "single-choice";

export const testOptions = generateFilledArray(14, (index) => ({
  id: faker.string.uuid(),
  index: index + 1,
  question: faker.lorem.sentences(4),
  type: faker.helpers.arrayElement<Choice>(["multiple-choice", "single-choice"]),
  choices: generateFilledArray(4, (index) => ({
    id: faker.string.uuid(),
    index: index + 1,
    content: faker.lorem.sentence().slice(0, 10),
  })),
}));

export type Test = (typeof testOptions)[number];
