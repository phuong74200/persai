import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ActionIcon,
  Box,
  Center,
  Group,
  List,
  Progress,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconArrowsShuffle,
  IconChevronLeft,
  IconChevronRight,
  IconRotateClockwise,
} from "@tabler/icons-react";
import { AnimatePresence } from "framer-motion";

import Card from "@/features/study-sets/components/card";
import { useFlashCardContext } from "@/features/study-sets/contexts/flashcard-context";
import useGetStudySetById from "@/features/study-sets/hooks/use-get-study-set-by-id";
import { useDelayFn } from "@/hooks/use-delay-fn";
import { useHotkeys } from "@/hooks/use-hotkeys";
import parseDec from "@/utils/parse-dec";

const progressStyles = {
  bar: {
    transition: "width 0.5s",
  },
};

const DELAY = 200;

export default function FlashCardPage() {
  const { setId } = useParams<{ setId: string }>();
  const { data } = useGetStudySetById(parseDec(setId));

  const { pool, next, prev, progress, shuffle, setItems, reset } = useFlashCardContext();
  const theme = useMantineTheme();

  const [delayShuffle, isShuffleDelay] = useDelayFn(shuffle, DELAY * 4);
  const [delayReset, isResetDelay] = useDelayFn(reset, DELAY * 4);
  const [delayNext] = useDelayFn(next, DELAY);
  const [deplayPrev] = useDelayFn(prev, DELAY);

  useHotkeys([
    ["arrowRight", next, { delay: DELAY }],
    ["arrowLeft", prev, { delay: DELAY }],
  ]);

  useEffect(() => {
    setItems(data?.questionResponses || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setId, data?.id]);

  return (
    <>
      <Progress value={progress} styles={progressStyles} />
      <Center className="h-full overflow-hidden">
        <Stack spacing="2.5rem">
          <Box className="relative h-[35rem] w-[35rem] [perspective:3000px] sm:h-[25rem] sm:w-[25rem] xs:h-[20rem] xs:w-[20rem]">
            <Box className="absolute left-[-5rem] top-[50%] translate-y-[-50%]">
              <ActionIcon variant="subtle" radius="50%" size="3rem" onClick={deplayPrev}>
                <IconChevronLeft stroke={1.5} />
              </ActionIcon>
            </Box>

            <AnimatePresence>
              {pool.map((item, i) => (
                <Card
                  key={item.id}
                  index={i}
                  className="h-full w-full [transform-style:preserve-3d]"
                >
                  <Card.Front className="flex items-center justify-center" p="lg">
                    <Stack>
                      <Text className="whitespace-pre-line font-bold">{item.question}</Text>
                      <List type="ordered">
                        {item.answers?.map((answer, index) => (
                          <List.Item key={index}>
                            <Text className="whitespace-pre-line">{answer}</Text>
                          </List.Item>
                        ))}
                      </List>
                    </Stack>
                  </Card.Front>
                  <Card.Back className="flex items-center justify-center" p="lg">
                    <Text className="whitespace-pre-line font-bold">{item.correctAnswer}</Text>
                  </Card.Back>
                </Card>
              ))}
            </AnimatePresence>

            <Box className="absolute right-[-5rem] top-[50%] translate-y-[-50%]">
              <ActionIcon variant="subtle" radius="50%" size="3rem" onClick={delayNext}>
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
              loading={!isShuffleDelay}
            >
              <IconArrowsShuffle stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              aria-label="Settings"
              size="3rem"
              color={theme.primaryColor}
              radius="50%"
              onClick={delayReset}
              loading={!isResetDelay}
            >
              <IconRotateClockwise stroke={1.5} />
            </ActionIcon>
          </Group>
        </Stack>
      </Center>
    </>
  );
}
