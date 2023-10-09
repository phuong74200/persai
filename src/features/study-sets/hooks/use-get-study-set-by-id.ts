import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { operations } from "@/api/v1";
import { StudySet } from "@/features/study-sets/domains/study-set";

export default function useGetStudySetById(
  study_set_id: operations["getStudySetById"]["parameters"]["path"]["study_set_id"],
) {
  const query = useQuery({
    ...queryKeys.studySet.byId(study_set_id),
    select(data) {
      return new StudySet(data.data);
    },
  });

  return { ...query };
}
