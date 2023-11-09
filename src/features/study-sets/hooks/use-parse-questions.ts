import { useMutation } from "@tanstack/react-query";

import { client } from "@/api/openapi-fetch";
import { components } from "@/api/v1";

export default function useParseQuestions(
  cb?: (data: components["schemas"]["CreateQuestionRequest"][]) => void,
) {
  const mutation = useMutation({
    mutationFn: async ({ excel }: { excel: File }) => {
      const response = await client.POST(`/api/v1/study-set/excel/parse-questions`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: {
          excel: excel,
        },
        bodySerializer(body) {
          const formData = new FormData();
          if (body?.excel) formData.append("excel", body?.excel);
          return formData;
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },

    onSuccess(data) {
      cb?.(data.data || []);
    },

    cacheTime: 0,
  });

  const submit = (excel: File) => {
    mutation.mutate({ excel });
  };

  return { ...mutation, submit };
}
