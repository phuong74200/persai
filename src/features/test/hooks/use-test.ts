import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "@mantine/form";

import useGetStudySetById from "@/features/study-sets/hooks/use-get-study-set-by-id";

export default function useTest(setId: number) {
  const { data } = useGetStudySetById(setId);
  const [score, setScore] = useState<number | null>(null);

  const form = useForm<{
    [key: string]: string;
  }>({
    initialValues: {},
  });

  useEffect(() => {
    form.setValues(
      data?.questionResponses.reduce(
        (acc, item) => ({
          ...acc,
          [item.id?.toString() || ""]: null,
        }),
        {},
      ) || {},
    );
  }, [data?.id]);

  const questionResponses = useMemo(() => data?.questionResponses || [], [data?.id]);

  const getScore = useCallback(() => {
    setScore(data?.score(form.values).score || 0);
  }, [data, form.values]);

  return { form, questionResponses, studySet: data, getScore, score };
}
