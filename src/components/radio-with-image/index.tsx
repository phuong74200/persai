import { forwardRef } from "react";
import {
  DefaultProps,
  extractSystemStyles,
  MantineColor,
  MantineSize,
  Selectors,
} from "@mantine/core";
import { useId } from "@mantine/hooks";

import { InlineInput, InlineInputStylesNames } from "@/components/inline-input";
import { useRadioGroupContext } from "@/components/radio-with-image/context";
import { RadioGroup } from "@/components/radio-with-image/group";
import { RadioWithImageStylesParams, useStyles } from "@/components/radio-with-image/styles";
import { useComponentDefaultProps } from "@/hooks/use-component-default-props";

import { RadioIcon } from "./icon";

export type RadioStylesNames = Selectors<typeof useStyles> | InlineInputStylesNames;

export interface RadioWithImageProps
  extends DefaultProps<RadioStylesNames, RadioWithImageStylesParams>,
    Omit<React.ComponentPropsWithRef<"input">, "size"> {
  variant?: string;

  /** Radio label */
  label?: React.ReactNode;

  /** Active radio color from theme.colors */
  color?: MantineColor;

  /** Predefined label fontSize, radio width, height and border-radius */
  size?: MantineSize;

  /** Replace default icon */
  icon?: React.FC<React.ComponentPropsWithoutRef<"svg">>;

  /** Animation duration in ms */
  transitionDuration?: number;

  /** Props spread to root element */
  wrapperProps?: Record<string, unknown>;

  /** Position of label */
  labelPosition?: "left" | "right";

  /** description, displayed after label */
  description?: React.ReactNode;

  /** Displays error message after input */
  error?: React.ReactNode;

  image: string;
}

const defaultProps: Partial<RadioWithImageProps> = {
  transitionDuration: 100,
  size: "sm",
};

const RadioWithImage = forwardRef<HTMLInputElement, RadioWithImageProps>((props, ref) => {
  const {
    id,
    size,
    label,
    description,
    image,
    wrapperProps,
    disabled,
    styles,
    color,
    transitionDuration,
    classNames,
    error,
    className,
    style,
    sx,
    unstyled,
    labelPosition,
    variant,
    ...others
  } = useComponentDefaultProps("RadioWithImage", defaultProps, props);
  const ctx = useRadioGroupContext();

  const contextSize = ctx?.size ?? size;
  const componentSize = props.size ? size : contextSize;

  const { systemStyles, rest } = extractSystemStyles(others);
  const uuid = useId(id);

  const contextProps = ctx
    ? {
        checked: ctx.value === rest.value,
        name: rest.name ?? ctx.name,
        onChange: ctx.onChange,
      }
    : {};

  const { classes } = useStyles(
    { color, transitionDuration, error: !!error, checked: !!contextProps.checked },
    {
      name: "RadioWithImage",
      styles,
      size: componentSize,
      classNames,
    },
  );

  return (
    <InlineInput
      className={className}
      sx={sx}
      style={style}
      id={uuid}
      size={componentSize}
      labelPosition={labelPosition}
      label={null}
      description={null}
      error={error}
      disabled={disabled}
      __staticSelector="Radio"
      classNames={classNames}
      unstyled={unstyled}
      data-checked={contextProps.checked || undefined}
      variant={variant}
      {...systemStyles}
      {...wrapperProps}
    >
      <label className={classes.root} htmlFor={uuid}>
        <div className={classes.details}>
          <div className={classes.imageWrapper}>
            <img src={image} className={classes.image} alt={image} />
          </div>
          <div>
            <div className={classes.label}>{label}</div>
            <div className={classes.description}>{description}</div>
          </div>
        </div>
        <div className={classes.inner}>
          <input
            className={classes.radio}
            id={uuid}
            disabled={disabled}
            {...rest}
            ref={ref}
            type="radio"
            {...contextProps}
          />
          <RadioIcon className={classes.icon} aria-hidden />
        </div>
      </label>
    </InlineInput>
  );
});

export default Object.assign(RadioWithImage, {
  Group: RadioGroup,
});
