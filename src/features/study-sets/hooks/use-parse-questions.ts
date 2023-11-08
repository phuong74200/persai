import { useMutation } from "@tanstack/react-query";

import { client } from "@/api/openapi-fetch";

export default function useParseQuestions(cb?: () => void) {
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

    onSuccess() {
      cb && cb();
    },

    cacheTime: 0,
  });

  const submit = (excel: File) => {
    mutation.mutate({ excel });
  };

  return { ...mutation, submit };
}
