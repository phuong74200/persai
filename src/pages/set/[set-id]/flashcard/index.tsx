import { Box, Center, Paper, Text, Title } from "@mantine/core";
import { AnimatePresence } from "framer-motion";

import Card from "@/features/flashcard/components/card";
import {
  FlashCardContext,
  FlashCardContextProvider,
} from "@/features/flashcard/contexts/flashcard-context";

export default function FlashCardPage() {
  return (
    <Center className="h-full overflow-hidden">
      <FlashCardContextProvider>
        <Box className="relative h-[35rem] w-[35rem] [perspective:3000px]">
          <FlashCardContext.Consumer>
            {(values) => (
              <AnimatePresence mode="wait">
                <AnimatePresence>
                  {values.pool.map((item, i) => (
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
              </AnimatePresence>
            )}
          </FlashCardContext.Consumer>
        </Box>
      </FlashCardContextProvider>
    </Center>
  );
}
