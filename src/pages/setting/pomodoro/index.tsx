import { useEffect } from "react";
import { Button, Group, Modal, NumberInput, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconBooks,
  IconCircleChevronsUp,
  IconCircleChevronUp,
  IconCircleDotted,
} from "@tabler/icons-react";

import { components } from "@/api/v1";
import useGetPomodoro from "@/features/poromodo/hooks/use-get-pomodoro";
import useUpdatePomodoro from "@/features/poromodo/hooks/use-update-pomodoro";
import useModalRouteTrasition from "@/hooks/use-modal-route-transition";

export default function PomodoroSettingPage() {
  const { open, goBack } = useModalRouteTrasition();
  const { data } = useGetPomodoro();
  const { submit } = useUpdatePomodoro();

  const form = useForm<components["schemas"]["UpdatePomodoroRequest"]>({});

  useEffect(() => {
    form.setValues({
      longBreak: data?.longBreakInSecond,
      longBreakInterval: data?.longBreakInterval,
      shortBreak: data?.shortBreakInSecond,
      studyTime: data?.studyTimeInSecond,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data?.longBreakInSecond,
    data?.longBreakInterval,
    data?.shortBreakInSecond,
    data?.studyTimeInSecond,
  ]);

  const handleSubmit = () => {
    goBack();
    submit(form);
  };

  return (
    <Modal
      opened={open}
      onClose={goBack}
      transitionProps={{
        transition: "slide-up",
      }}
      withCloseButton={false}
      size={700}
      centered
    >
      <Title order={3} mb="md">
        Pomodoro config
      </Title>
      <Stack>
        <SimpleGrid cols={2}>
          <NumberInput
            icon={<IconBooks />}
            label="Study time"
            placeholder="In seconds"
            step={0.1}
            {...form.getInputProps("studyTime")}
          />
          <NumberInput
            icon={<IconCircleChevronUp />}
            label="Short break"
            placeholder="In seconds"
            step={0.1}
            {...form.getInputProps("shortBreak")}
          />
          <NumberInput
            icon={<IconCircleChevronsUp />}
            label="Long break"
            placeholder="In seconds"
            step={0.1}
            {...form.getInputProps("longBreak")}
          />
          <NumberInput
            icon={<IconCircleDotted />}
            label="Long break interval"
            step={0.1}
            {...form.getInputProps("longBreakInterval")}
          />
        </SimpleGrid>
        <Text>
          Every done of a <b>study time</b> + <b>short break</b> count as an <b>interval</b>
        </Text>
        <Group position="right">
          <Button onClick={handleSubmit}>Save</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
