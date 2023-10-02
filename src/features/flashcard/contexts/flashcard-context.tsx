import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { faker } from "@faker-js/faker";

import generateFilledArray from "@/utils/generate-filled-array";

export default function createFlashCardContext<T = unknown>(cards: T[], poolSize = 5) {
  type Props = {
    items: T[];
    setItems: Dispatch<SetStateAction<T[]>>;
    pool: T[];
    removeItem: (index: number) => void;
  };

  const FlashCardContext = createContext<Props>({} as Props);

  const FlashCardContextProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<T[]>(cards);

    const pool = items.slice(0, poolSize);

    const value = useMemo(() => ({ items, setItems, pool }), [items, setItems, pool]);

    const removeItem = useCallback((index: number) => {
      setItems((prev) => prev.filter((_, i) => i !== index));
    }, []);

    return (
      <FlashCardContext.Provider value={{ ...value, removeItem }}>
        {children}
      </FlashCardContext.Provider>
    );
  };

  const useFlashCardContext = () => useContext(FlashCardContext);

  return {
    FlashCardContextProvider,
    FlashCardContext,
    useFlashCardContext,
  };
}

const items = generateFilledArray(300, () => ({
  id: faker.string.uuid(),
  color: faker.color.rgb({
    format: "hex",
  }),
  sides: generateFilledArray(2, () => ({
    id: faker.string.uuid(),
    text: faker.lorem.paragraphs({ min: 1, max: 3 }),
  })),
})).map((e, index) => ({
  ...e,
  index,
}));

export const { FlashCardContextProvider, FlashCardContext, useFlashCardContext } =
  createFlashCardContext(items, 5);
