import { useEffect } from "react";
import {
  Button,
  Container,
  CopyButton,
  Grid,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { sentenceCase } from "change-case";

import { operations } from "@/api/v1";
import { useGetCurrentUserFromCache } from "@/features/auth/hooks/use-get-current-user";
import useLogout from "@/features/auth/hooks/use-logout";
import ReferralInput from "@/features/referral/components/referral-input";
import AvatarSetting from "@/features/user/components/avatar-setting";
import useUpdateCurrentUser from "@/features/user/hooks/use-update-current-user";
import useRedirect from "@/hooks/use-redirect";
import { COLOR_LIST } from "@/utils/get-mantine-color-from-string";

type Form = operations["updateCurrentUser"]["requestBody"]["content"]["application/json"];

const colors = COLOR_LIST.map((color) => ({
  value: color.toUpperCase(),
  label: sentenceCase(color),
}))
  .filter((color) => color.value !== "DARK" && color.value !== "GREEN")
  .concat(
    {
      value: "DEFAULT",
      label: "Default",
    },
    {
      value: "GREEN",
      label: "Green (default)",
    },
  );

export default function ProfileSettingPage() {
  const theme = useMantineTheme();
  const cache = useGetCurrentUserFromCache();
  const { onRedirect } = useRedirect();
  const { logout } = useLogout();

  const form = useForm<Form>({
    initialValues: {
      fullName: cache?.fullName,
      theme: cache?.theme,
    },
  });

  const { submit, isLoading } = useUpdateCurrentUser();

  useEffect(() => {
    form.setValues({
      fullName: cache?.fullName,
      theme: cache?.theme,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cache?.email, cache?.fullName, cache?.referralCode?.referralCode, cache?.theme]);

  return (
    <Container size="md" mb="4rem">
      <Stack>
        <Stack align="center">
          <AvatarSetting />
          <Title align="center" my="2rem">
            Welcome back {cache?.fullName}
          </Title>
        </Stack>
        <Stack>
          <Grid>
            <Grid.Col md={8} sm={12}>
              <Paper p="md">
                <Stack>
                  <TextInput label="Full name" {...form.getInputProps("fullName")} />
                  <Group noWrap>
                    <Tooltip label="Premium user only" disabled={cache?.isPremium}>
                      <Select
                        disabled={!cache?.isPremium}
                        data={colors}
                        label="Theme"
                        {...form.getInputProps("theme")}
                      />
                    </Tooltip>
                    <TextInput w="100%" label="Email" disabled value={cache?.email} />
                  </Group>
                  <Button loading={isLoading} mt="md" onClick={submit(form)}>
                    Save
                  </Button>
                </Stack>
              </Paper>
            </Grid.Col>
            <Grid.Col md={4} sm={12}>
              <Stack>
                <Paper p="md">
                  <Stack>
                    <CopyButton value={cache?.referralCode?.referralCode || ""} timeout={2000}>
                      {({ copied, copy }) => (
                        <>
                          <Text size="lg" weight="bold">
                            Invitation code
                          </Text>
                          <ReferralInput />
                          <Stack onClick={copy} className="cursor-pointer">
                            <Text size="lg" weight="bold">
                              Your referral code
                            </Text>
                            <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                              <Text color={theme.primaryColor} onCopy={copy} className="w-fit">
                                {cache?.referralCode?.referralCode || ""}
                              </Text>
                            </Tooltip>
                            <Text size="sm" color="dimmed" italic>
                              Share your referral code to your friends and get 15 days free premium
                            </Text>
                          </Stack>
                        </>
                      )}
                    </CopyButton>
                  </Stack>
                </Paper>
                <Paper p="md">
                  <Stack>
                    <Text size="lg" weight="bold">
                      Your plans
                    </Text>
                    <Text>{cache?.subscription?.currentSubscriptionId}</Text>
                    <Text>Expired date: {cache?.subscriptionExpireDate}</Text>
                    <Button variant="gradient" onClick={onRedirect("/subscription")}>
                      Upgrade now
                    </Button>
                    {!cache?.isPremium && (
                      <Text size="sm" color="dimmed" italic>
                        Upgrade your plan to premium to get more features
                      </Text>
                    )}
                  </Stack>
                </Paper>

                <Paper p="md">
                  <Button onClick={logout} fullWidth color="red">
                    Logout
                  </Button>
                </Paper>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
}
