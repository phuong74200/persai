import { useId, useMemo } from "react";
import { Avatar, clsx, createStyles, Group, Paper, Radio, RadioProps, Text } from "@mantine/core";

type StyleParams = {
  isSelected: boolean;
  isAnswer: boolean;
  reveal: boolean;
};

const useStyles = createStyles((theme, { isAnswer, isSelected, reveal }: StyleParams) => {
  const falseColor = theme.fn.variant({
    variant: "filled",
    color: "red",
  });

  const trueColor = theme.fn.variant({
    variant: "filled",
    color: "green",
  });
  const disabledColor = theme.fn.variant({
    variant: "filled",
    color: "gray",
  });
  const mainColor = theme.fn.variant({
    variant: "filled",
    color: theme.primaryColor,
  });

  const colors = useMemo(() => {
    if (isSelected && reveal && !isAnswer) return falseColor;
    if (isAnswer && reveal) {
      return trueColor;
    }
    if (isSelected) return mainColor;
    if (reveal) return disabledColor;
  }, [disabledColor, falseColor, isAnswer, isSelected, mainColor, reveal, trueColor]);

  return {
    radio: {
      borderColor: isSelected ? colors?.border : undefined,
      pointerEvents: reveal ? "none" : undefined,
      background: colors?.background,
      color: colors?.color,
    },
  };
});

interface Props extends RadioProps {
  index: number;
  isSelected: boolean;
  reveal: boolean;
  isAnswer: boolean;
}

export default function RadioItem({ index, label, isSelected, isAnswer, reveal, ...rest }: Props) {
  const { classes, theme } = useStyles({ isAnswer, isSelected, reveal });
  const id = useId();

  const colors = theme.fn.variant({
    variant: "filled",
    color: theme.primaryColor,
  });

  return (
    <Paper
      p="md"
      withBorder
      component="label"
      htmlFor={id}
      className={clsx("cursor-pointer", classes.radio)}
    >
      <Radio className="hidden" id={id} {...rest} />
      <Group noWrap className="h-full">
        <Avatar radius="50%">{index}</Avatar>
        <Text color={isSelected ? colors.color : undefined}>{label}</Text>
      </Group>
    </Paper>
  );
}
