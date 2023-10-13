import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { StudySet } from "@/shared/domains/study-set";

export default function useGetAllStudySet() {
  const query = useQuery({
    ...queryKeys.studySet.all(),
    select(data) {
      return data.data?.map((studySet) => new StudySet(studySet)) || [];
    },
  });

  return { ...query };
}
