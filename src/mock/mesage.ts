import { faker } from "@faker-js/faker";

import { MessageDomain } from "@/features/gpt/domains/message";
import generateFilledArray from "@/utils/generate-filled-array";

export const messages = generateFilledArray(
  100,
  () =>
    new MessageDomain({
      id: faker.string.uuid(),
      content: faker.lorem.paragraph({ min: 1, max: 3 }),
      createdAt: faker.date.future(),
      sender: {
        id: faker.helpers.arrayElement(["me", "gpt"]),
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
      },
    }),
);
