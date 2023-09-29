import { FocusEvent, useState } from "react";
import { IMaskInput } from "react-imask";
import { createStyles, InputBase, rem, TextInputProps, Tooltip } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";

const useStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
  root: {
    position: "relative",
  },

  label: {
    position: "absolute",
    zIndex: 2,
    top: rem(7),
    left: theme.spacing.sm,
    pointerEvents: "none",
    color: floating
      ? theme.colorScheme === "dark"
        ? theme.white
        : theme.black
      : theme.colorScheme === "dark"
      ? theme.colors.dark[3]
      : theme.colors.gray[5],
    transition: "transform 150ms ease, color 150ms ease, font-size 150ms ease",
    transform: floating ? `translate(-4px, ${rem(-16)})` : "none",
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
    background: "#fff",
    padding: floating ? "0 4px" : "unset",
  },

  required: {
    transition: "opacity 150ms ease",
    opacity: floating ? 1 : 0,
  },

  input: {
    "&::placeholder": {
      transition: "color 150ms ease",
      color: !floating ? "transparent" : undefined,
    },
  },
}));

interface FloatingLabelInputProps {
  value?: string;
  onChange?(value: string): void;
  defaultValue?: string;
  mask?: string;
}

export default function FloatingLabelInput({
  onChange,
  value,
  defaultValue,
  onFocus,
  onBlur,
  error,
  mask,
  ...others
}: FloatingLabelInputProps & TextInputProps) {
  const [focused, setFocused] = useState(false);
  const [uncontrolledValue, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange,
  });
  const { classes } = useStyles({
    floating: uncontrolledValue.toString().trim().length !== 0 || focused,
  });

  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.currentTarget.value);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (!error) setFocused(false);
    onBlur?.(e);
  };

  return (
    <Tooltip color="red" position="bottom" label={error} disabled={!error}>
      <InputBase
        component={IMaskInput}
        label="Floating label"
        placeholder="OMG, it also has a placeholder"
        required
        classNames={classes}
        value={value}
        onChange={changeEvent}
        mt="md"
        mask={mask}
        {...others}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={Boolean(error)}
      />
    </Tooltip>
  );
}
