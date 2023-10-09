import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { client } from "@/api/openapi-fetch";
import { components } from "@/api/v1";
import { CreateSetFormType } from "@/features/study-sets/types/create-set-form-type";
import localStudySetToBeStudySet from "@/features/study-sets/utils/local-study-set-to-server-study-set";

export type CreateStudySetRequest = {
  body: components["schemas"]["CreateStudySetRequest"];
  image: File;
};

export default function useCreateStudySet() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ body, image }: CreateStudySetRequest) => {
      const response = await client.POST(`/api/v1/study-set`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: {
          create_study_set_request: body,
          image: image,
        },
        bodySerializer(body) {
          const formData = new FormData();

          formData.append(
            "create_study_set_request",
            new Blob([JSON.stringify(body?.create_study_set_request)], {
              type: "application/json",
            }),
          );

          if (body?.image) formData.append("image", body?.image);

          return formData;
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },

    onSuccess() {
      queryClient.invalidateQueries(queryKeys.studySet._def);
    },
  });

  const submit = useCallback(
    (data: CreateSetFormType) => {
      mutation.mutate({
        body: {
          studySetName: data.studySetName,
          questionsList: localStudySetToBeStudySet(data.studySets),
          visibility: data.visibility ? "PRIVATE" : "PUBLIC",
        },
        image: data.image,
      });
    },
    [mutation],
  );

  return { mutation, submit };
}
