import { useMutation } from "@tanstack/react-query";

import { client } from "@/api/openapi-fetch";

export default function useCreateNote() {
  const mutation = useMutation({
    mutationFn: async ({ question_id, note }: { question_id: number; note: string }) => {
      const response = await client.PUT("/api/v1/study-set/question/{question_id}/note", {
        body: {
          note,
        },
        params: {
          path: {
            question_id,
          },
        },
      });

      return response;
    },
  });

  return mutation;
}
