import { createContext } from "react";

type Context = {
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  opened: boolean;
  close: () => void;
  open: () => void;
  toggle: () => void;
};

export const NoteContext = createContext<Context>({} as Context);
