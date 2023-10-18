import { UseFormReturnType } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { client } from "@/api/openapi-fetch";
import { components } from "@/api/v1";

type UpdatePomodoroRequest = components["schemas"]["UpdatePomodoroRequest"];

export default function useUpdatePomodoro() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body: UpdatePomodoroRequest) => {
      const response = await client.PUT(`/api/v1/user/pomodoro-clock`, {
        body: body,
      });

      if (!response.response.ok) throw response.error;

      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.pomodoro._def);
    },
  });

  const submit = (form: UseFormReturnType<UpdatePomodoroRequest>) => {
    mutation.mutate({
      status: form.values.status || "ON",
      longBreak: form.values.longBreak || 0,
      longBreakInterval: form.values.longBreakInterval || 0,
      shortBreak: form.values.shortBreak || 0,
      studyTime: form.values.studyTime || 0,
    });
  };

  return { ...mutation, submit };
}
