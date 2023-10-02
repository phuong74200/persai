import { Box, Paper } from "@mantine/core";
import { AnimatePresence } from "framer-motion";

import Card from "@/features/flashcard/components/card";
import {
  FlashCardContext,
  FlashCardContextProvider,
} from "@/features/flashcard/contexts/flashcard-context";

export default function FlashCardPage() {
  return (
    <FlashCardContextProvider>
      <Box
        className="absolute top-[300px]"
        style={{
          perspective: 1000,
        }}
      >
        <FlashCardContext.Consumer>
          {(values) => (
            <AnimatePresence>
              {values.pool.map((item, i) => (
                <Card key={item.id} index={i} color={item.color}>
                  <Paper w={350} h={350} bg={item.color} shadow="md">
                    {item.sides[0].text}
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
