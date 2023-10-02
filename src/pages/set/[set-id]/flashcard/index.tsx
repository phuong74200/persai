import { Box, Paper, Text, Title } from "@mantine/core";
import { AnimatePresence } from "framer-motion";

import Card from "@/features/flashcard/components/card";
import {
  FlashCardContext,
  FlashCardContextProvider,
} from "@/features/flashcard/contexts/flashcard-context";

export default function FlashCardPage() {
  return (
    <FlashCardContextProvider>
      <Box className="[perspective:3000px]">
        <FlashCardContext.Consumer>
          {(values) => (
            <AnimatePresence>
              {values.pool.map((item, i) => (
                <Card
                  key={item.id}
                  index={i}
                  color={item.color}
                  className="[transform-style:preserve-3d]"
                >
                  <Paper
                    w={600}
                    h={600}
                    bg={item.color}
                    shadow="lg"
                    p="md"
                    className="[backface-visibility:hidden]"
                  >
                    <Title mb="md">Front side {item.index}</Title>
                    <Text className="whitespace-pre-line">{item.sides[0].text}</Text>
                  </Paper>
                  <Paper
                    w={600}
                    h={600}
                    bg={item.color}
                    shadow="lg"
                    p="md"
                    className="absolute left-0 top-0 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  >
                    <Title mb="md">Back side {item.index}</Title>
                    <Text className="whitespace-pre-line">{item.sides[1].text}</Text>
                  </Paper>
                </Card>
              ))}
            </AnimatePresence>
          )}
        </FlashCardContext.Consumer>
      </Box>
    </FlashCardContextProvider>
  );
}
