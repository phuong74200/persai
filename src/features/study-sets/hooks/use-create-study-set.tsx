import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { client } from "@/api/openapi-fetch";
import { components } from "@/api/v1";
import { notification } from "@/configs/notifications";
import { CreateSetFormType } from "@/features/study-sets/types/create-set-form-type";
import localStudySetToBeStudySet from "@/features/study-sets/utils/local-study-set-to-server-study-set";
import generateQueryId from "@/utils/generate-query-id";

export type CreateStudySetRequest = {
  body: components["schemas"]["CreateStudySetRequest"];
  image: File;
};

export default function useCreateStudySet() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

          if (body?.create_study_set_request.questionsList) {
            body.create_study_set_request.questionsList =
              body.create_study_set_request.questionsList.map((quest) => {
                if (!quest.correctAnswer)
                  return {
                    question: quest.question,
                    answers: quest.answers,
                    gptGenerated: true,
                  };

                return quest;
              });

            formData.append(
              "create_study_set_request",
              new Blob([JSON.stringify(body?.create_study_set_request)], {
                type: "application/json",
              }),
            );
          }

          if (body?.image) formData.append("image", body?.image);

          return formData;
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },

    onMutate: (vars) => {
      notification.loader({
        id: generateQueryId(vars),
        message: (
          <>
            Creating study set <b>{vars.body.studySetName}</b>
          </>
        ),
      });
    },

    onSuccess: (_r, vars) => {
      notification.success({
        id: generateQueryId(vars),
        message: (
          <>
            Created study set <b>{vars.body.studySetName}</b> success
          </>
        ),
      });

      queryClient.invalidateQueries(queryKeys.studySet._def);
      navigate("/my-collection");
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

  return { ...mutation, submit };
}
