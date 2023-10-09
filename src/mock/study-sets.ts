import { faker } from "@faker-js/faker";

import { StudySet } from "@/features/study-sets/domains/study-set";
import generateFilledArray from "@/utils/generate-filled-array";

export const answers = generateFilledArray([3, 5], () => faker.lorem.sentence());

export const questions = generateFilledArray(10, (index) => ({
  id: index,
  question: faker.lorem.sentence(),
  answers,
  correctAnswer: faker.helpers.arrayElement(answers),
  fullGptAnswer: faker.lorem.sentences(),
  note: faker.helpers.arrayElement([undefined, faker.lorem.paragraph()]),
  gptGenerated: false,
}));

export const studySet = new StudySet({
  createdAt: faker.date.past().toISOString(),
  feImageName: faker.image.urlPicsumPhotos(),
  id: 0,
  questionResponses: questions,
  status: true,
  studySetName: faker.commerce.product(),
  updatedAt: faker.date.past().toISOString(),
  userFullName: faker.person.fullName(),
  userId: faker.string.uuid(),
  visibility: "PUBLIC",
});

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
