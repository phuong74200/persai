import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { operations } from "@/api/v1";
import { useGetCurrentUserFromCache } from "@/features/auth/hooks/use-get-current-user";
import useReferral from "@/features/referral/hooks/use-referral";

export default function ReferralInput() {
  const user = useGetCurrentUserFromCache();

  const form = useForm<{
    referralCode: operations["enterReferralCode"]["requestBody"]["content"]["application/json"]["referralCode"];
  }>({
    initialValues: {
      referralCode: "",
    },
  });

  const { submit, isLoading } = useReferral();

  const handleSubmit = () => {
    submit(form.values.referralCode);
    form.setValues({
      referralCode: "",
    });
  };

  return (
    <Group noWrap>
      <TextInput
        disabled={user?.referralCode?.usingReferralCode}
        w="100%"
        placeholder="Invitation code"
        {...form.getInputProps("referralCode")}
      />
      <Button
        disabled={user?.referralCode?.usingReferralCode}
        loading={isLoading}
        onClick={handleSubmit}
        variant="gradient"
      >
        {user?.referralCode?.usingReferralCode ? "Used" : "Submit"}
      </Button>
    </Group>
  );
}
