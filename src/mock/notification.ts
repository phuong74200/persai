import { faker } from "@faker-js/faker";

import { Notification } from "@/features/notification/domains/notification";
import generateFilledArray from "@/utils/generate-filled-array";

export const notifications = generateFilledArray(
  10,
  () =>
    new Notification({
      id: faker.string.uuid(),
      content: faker.lorem.paragraph(),
      createdAt: faker.date.recent(),
      isRead: faker.datatype.boolean(),
      from: {
        avatar: faker.image.avatar(),
        name: faker.person.fullName(),
      },
    }),
);
