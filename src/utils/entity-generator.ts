import { faker } from "@faker-js/faker";

import { ClassType } from "@/types/enums/class-type";
import generateFilledArray from "@/utils/generate-filled-array";
import ronudCurrency from "@/utils/round-currency";

export const generatePerson = () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  avatar: faker.image.avatar(),
  course: faker.company.name(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  rating: faker.number.int({ min: 1, max: 5 }),
});

export type Person = ReturnType<typeof generatePerson>;

const defaultGenerateCourseOptions = {
  maxTime: 1,
  type: ClassType.GROUP,
};

export const generateCourse = (options?: Partial<typeof defaultGenerateCourseOptions>) => {
  const { maxTime, type } = {
    ...defaultGenerateCourseOptions,
    ...options,
  };

  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.lorem.paragraphs(),
    time: generateFilledArray(
      faker.number.int({ min: 1, max: maxTime }),
      () => [faker.date.future(), faker.date.future()] as [Date, Date],
    ),

    location: faker.location.streetAddress(),
    lecture: generatePerson(),
    price: ronudCurrency(faker.number.int({ min: 100000, max: 1000000 }), "thousand"),
    discount: faker.number.int({ min: 0, max: 100 }),
    otherPrice: faker.number.int({ min: 1000, max: 10000 }),

    subscription: faker.number.int({ min: 8, max: 10 }),
    tags: faker.lorem.words(faker.number.int({ min: 5, max: 15 })).split(" "),
    image: faker.image.urlPicsumPhotos(),
    isFavorite: faker.datatype.boolean(),
    status: faker.helpers.arrayElement([
      "Sẵn sàng",
      "Đang tìm ghép nhóm và trợ giảng",
      "Đang tìm trợ giảng",
    ]),
    type,

    createAt: faker.date.past(),
  };
};

export type CourseModel = ReturnType<typeof generateCourse>;
