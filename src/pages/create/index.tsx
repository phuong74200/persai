import { Controller, useForm } from "react-hook-form";
import { Checkbox, Container, Group, Stack } from "@mantine/core";

import TextInputWithCustomError from "@/components/textarea-with-custom-error";
import { useGetCurrentUserFromCache } from "@/features/auth/hooks/use-get-current-user";
import CreateQuestion from "@/features/study-sets/components/create-question";
import SetImage from "@/features/study-sets/components/set-image";
import useCreateStudySet from "@/features/study-sets/hooks/use-create-study-set";
import { CreateSetFormType } from "@/features/study-sets/types/create-set-form-type";
import { UploadButton } from "@/features/test/components/upload-button";

const defaultValues: Partial<CreateSetFormType> = {
  studySets: [
    {
      question: "",
      choices: [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "",
        },
      ],
      answer: 0,
    },
  ],
  studySetName: "New study set",
};

export default function CreateSetPage() {
  const user = useGetCurrentUserFromCache();
  const form = useForm<CreateSetFormType>({
    defaultValues,
  });

  const { submit, isLoading } = useCreateStudySet();

  return (
    <Container mb="2rem">
      <form onSubmit={form.handleSubmit(submit)}>
        <Stack spacing="2rem">
          <Group position="apart">
            <Group className="sm:w-full">
              <SetImage form={form} />
              <Stack className="sm:w-full">
                <Controller
                  control={form.control}
                  name="studySetName"
                  render={({ field }) => (
                    <TextInputWithCustomError
                      variant="filled"
                      placeholder="Study set title"
                      size="md"
                      className="sm:w-full [&_input]:font-bold"
                      {...field}
                    />
                  )}
                />
                {user?.subscription?.currentSubscriptionId === "PRO" && (
                  <Checkbox label="Private study set" {...form.register("visibility")} />
                )}
              </Stack>
            </Group>
            <UploadButton />
          </Group>
          <CreateQuestion form={form} isLoading={isLoading} />
        </Stack>
      </form>
    </Container>
  );
}
