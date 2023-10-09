import { useForm } from "@mantine/form";

import { Test } from "@/mock/study-sets";

export default function useTest(set: Test[]) {
  const form = useForm<{
    [key: string]: string;
  }>({
    initialValues: set.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: null,
      }),
      {},
    ),
  });

  return { form, set };
}
