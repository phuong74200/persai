import { useEffect } from "react";
import {
  Avatar,
  Container,
  CopyButton,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { components } from "@/api/v1";
import { useGetCurrentUserFromCache } from "@/features/auth/hooks/use-get-current-user";

type Form = Omit<components["schemas"]["UserResponse"], "referralCode"> & {
  referralCode: string;
};

export default function ProfileSettingPage() {
  const cache = useGetCurrentUserFromCache();

  const form = useForm<Form>({
    initialValues: {
      fullName: cache?.state.data?.data.fullName,
      email: cache?.state.data?.data.email,
      referralCode: cache?.state.data?.data.referralCode?.referralCode || "",
      theme: cache?.state.data?.data.theme,
    },
  });

  useEffect(() => {
    form.setValues({
      fullName: cache?.state.data?.data.fullName,
      email: cache?.state.data?.data.email,
      referralCode: cache?.state.data?.data.referralCode?.referralCode || "",
      theme: cache?.state.data?.data.theme,
    });
  }, [
    cache?.state.data?.data.email,
    cache?.state.data?.data.fullName,
    cache?.state.data?.data.referralCode?.referralCode,
    cache?.state.data?.data.theme,
  ]);

  return (
    <Container size="md">
      <Stack>
        <Stack align="center">
          <Avatar radius="50%" size={14 * 10} src={cache?.state.data?.data.feImageName} />
          <Title>Welcome back {cache?.state.data?.data.fullName}</Title>
        </Stack>
        <Stack>
          <SimpleGrid cols={2}>
            <CopyButton
              value={cache?.state.data?.data.referralCode?.referralCode || ""}
              timeout={2000}
            >
              {({ copy }) => (
                <TextInput
                  disabled
                  variant="filled"
                  onClick={copy}
                  label="Referral code"
                  {...form.getInputProps("referralCode")}
                />
              )}
            </CopyButton>
            <Select data={[]} label="Theme" {...form.getInputProps("theme")} />
            <TextInput label="Full name" {...form.getInputProps("fullName")} />
            <TextInput label="Email" disabled {...form.getInputProps("email")} />
          </SimpleGrid>
        </Stack>
      </Stack>
    </Container>
  );
}
