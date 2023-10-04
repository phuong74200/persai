import {
  ActionIcon,
  Box,
  Center,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowsShuffle, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { AnimatePresence } from "framer-motion";

import Card from "@/features/flashcard/components/card";
import { useFlashCardContext } from "@/features/flashcard/contexts/flashcard-context";
import useDelayFn from "@/hooks/use-delay-fn";
import { useHotkeys } from "@/hooks/use-hotkeys";

const progressStyles = {
  bar: {
    transition: "width 0.5s",
  },
};

const DELAY = 200;

export default function FlashCardPage() {
  const { pool, next, prev, progress, shuffle } = useFlashCardContext();
  const theme = useMantineTheme();
  const {
    fn: [delayNext, deplayPrev],
  } = useDelayFn([next, prev, shuffle], DELAY);

  const {
    fn: [delayShuffle],
    delays: [isShuffleDelay],
  } = useDelayFn([shuffle], 1000);

  useHotkeys([
    ["arrowRight", delayNext, { delay: DELAY }],
    ["arrowLeft", deplayPrev, { delay: DELAY }],
  ]);

  return (
    <>
      <Progress value={progress} styles={progressStyles} />
      <Center className="h-full overflow-hidden">
        <Stack spacing={18}>
          <Box className="relative h-[35rem] w-[35rem] [perspective:3000px]">
            <Box className="absolute left-[-4rem] top-[50%] translate-y-[-50%]">
              <ActionIcon
                variant="filled"
                aria-label="Settings"
                size="3rem"
                color={theme.primaryColor}
                onClick={deplayPrev}
              >
                <IconChevronLeft stroke={1.5} />
              </ActionIcon>
            </Box>

            <AnimatePresence>
              {pool.map((item, i) => (
                <Card
                  key={item.id}
                  index={i}
                  color={item.color}
                  className="h-full w-full [transform-style:preserve-3d]"
                >
                  <Paper
                    bg={item.color}
                    shadow="lg"
                    p="md"
                    className="h-full w-full [backface-visibility:hidden]"
                  >
                    <Title mb="md">Front side {item.index}</Title>
                    <Text className="whitespace-pre-line">{item.sides[0].text}</Text>
                  </Paper>
                  <Paper
                    bg={item.color}
                    shadow="lg"
                    p="md"
                    className="absolute left-0 top-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  >
                    <Title mb="md">Back side {item.index}</Title>
                    <Text className="whitespace-pre-line">{item.sides[1].text}</Text>
                  </Paper>
                </Card>
              ))}
            </AnimatePresence>

            <Box className="absolute right-[-4rem] top-[50%] translate-y-[-50%]">
              <ActionIcon
                variant="filled"
                aria-label="Settings"
                size="3rem"
                color={theme.primaryColor}
                onClick={delayNext}
              >
                <IconChevronRight stroke={1.5} />
              </ActionIcon>
            </Box>
          </Box>

          <Group position="center">
            <ActionIcon
              variant="filled"
              aria-label="Settings"
              size="3rem"
              color={theme.primaryColor}
              radius="50%"
              onClick={delayShuffle}
              loading={isShuffleDelay}
            >
              <IconArrowsShuffle stroke={1.5} />
            </ActionIcon>
          </Group>
        </Stack>
      </Center>
    </>
  );
}
