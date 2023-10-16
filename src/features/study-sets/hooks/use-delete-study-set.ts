import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { client } from "@/api/openapi-fetch";
import { operations } from "@/api/v1";

export default function useDeleteStudySet() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      study_set_id: operations["deleteStudySet"]["parameters"]["path"]["study_set_id"],
    ) => {
      const response = await client.DELETE("/api/v1/study-set/{study_set_id}", {
        params: {
          path: {
            study_set_id,
          },
        },
      });

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.studySet.current._def);
    },
  });

  const remove = (
    study_set_id: operations["deleteStudySet"]["parameters"]["path"]["study_set_id"],
  ) => {
    mutation.mutate(study_set_id);
  };

  return { ...mutation, remove };
}
