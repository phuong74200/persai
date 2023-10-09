import { createQueryKeys } from "@lukemorales/query-key-factory";

import { client } from "@/api/openapi-fetch";
import { operations } from "@/api/v1";

export const studySetKeys = createQueryKeys("studySet", {
  byId: (study_set_id: operations["getStudySetById"]["parameters"]["path"]["study_set_id"]) => ({
    queryKey: [study_set_id],
    queryFn: async () => {
      const response = await client.GET(`/api/v1/study-set/{study_set_id}`, {
        params: {
          path: {
            study_set_id,
          },
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },
  }),

  current: () => ({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await client.GET(`/api/v1/study-set/current`, {
        params: {
          query: { search: "" },
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },
  }),
});
