import { forwardRef } from "react";
import { Image, Text, UnstyledButton } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";

import { useStyles } from "@/components/checkbox-with-image/styles";

interface Props {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: string;
  description: string;
  image: string;
}

const CheckboxWithImage = forwardRef<
  HTMLButtonElement,
  Props & Omit<React.ComponentPropsWithoutRef<"button">, keyof Props>
>(
  (
    {
      checked,
      defaultChecked,
      onChange,
      title,
      description,
      className,
      image,
      disabled,
      ...others
    },
    ref,
  ) => {
    const [value, handleChange] = useUncontrolled({
      value: checked,
      defaultValue: defaultChecked,
      finalValue: false,
      onChange,
    });

    const { classes, cx } = useStyles({ checked: value });

    const handleClick = () => {
      if (disabled) return handleChange(false);
      handleChange(!value);
    };

    return (
      <UnstyledButton
        ref={ref}
        {...others}
        onClick={handleClick}
        className={cx(classes.button, className, { [classes.disabled]: disabled })}
      >
        <Image src={image} alt={title} width={40} />

        <div className={classes.body}>
          <Text color="dimmed" size="xs" sx={{ lineHeight: 1 }} mb={5}>
            {description}
          </Text>
          <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
            {title}
          </Text>
        </div>
      </UnstyledButton>
    );
  },
);

export default CheckboxWithImage;
