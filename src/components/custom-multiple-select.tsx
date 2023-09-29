import { forwardRef } from "react";
import {
  Avatar,
  Box,
  CloseButton,
  Flex,
  MultiSelect,
  MultiSelectProps,
  MultiSelectValueProps,
  rem,
} from "@mantine/core";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

function Value({ image, label, onRemove, ...others }: MultiSelectValueProps & ItemProps) {
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          display: "flex",
          cursor: "default",
          alignItems: "center",
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          border: `${rem(1)} solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[4]
          }`,
          paddingLeft: theme.spacing.xs,
          borderRadius: theme.radius.sm,
        })}
      >
        <Box mr={10}>
          <Avatar src={image} size={12} />
        </Box>
        <Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
        <CloseButton
          onMouseDown={onRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
}

const Item = forwardRef<HTMLDivElement, ItemProps>(({ label, image, ...others }, ref) => {
  return (
    <div ref={ref} {...others}>
      <Flex align="center">
        <Box mr={10}>
          <Avatar src={image} />
        </Box>
        <div>{label}</div>
      </Flex>
    </div>
  );
});

export default function CustomMultipleSelect(props: MultiSelectProps) {
  return (
    <MultiSelect
      limit={20}
      valueComponent={Value}
      itemComponent={Item}
      searchable
      placeholder="Pick countries"
      {...props}
    />
  );
}
