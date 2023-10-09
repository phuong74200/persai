import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { StudySet } from "@/features/study-sets/domains/study-set";

export default function useGetCurrentUserStudySet() {
  const query = useQuery({
    ...queryKeys.studySet.current(),
    select(data) {
      return data.data?.map((studySet) => new StudySet(studySet)) || [];
    },
  });

  return { ...query };
}
