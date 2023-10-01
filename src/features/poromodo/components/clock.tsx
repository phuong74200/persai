import { RingProgress, Text } from "@mantine/core";

export default function Clock() {
  return (
    <RingProgress
      label={
        <Text size="xs" align="center">
          Application data usage
        </Text>
      }
      sections={[
        { value: 40, color: "cyan" },
        { value: 15, color: "orange" },
        { value: 15, color: "grape" },
      ]}
    />
  );
}
