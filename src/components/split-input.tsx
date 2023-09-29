import {
  Button,
  createStyles,
  Group,
  Input,
  MantineNumberSize,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const useStyles = createStyles(() => ({
  button: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

interface Props {
  radius?: MantineNumberSize;
}

export function SplitInput({ radius }: Props) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Group noWrap spacing={2}>
      <Input
        variant="filled"
        icon={<IconSearch size={theme.fontSizes.md} />}
        styles={{
          input: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
        radius={radius}
      />
      <Button className={classes.button} radius={radius}>
        Search
      </Button>
    </Group>
  );
}
