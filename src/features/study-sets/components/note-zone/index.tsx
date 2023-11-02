import { ChangeEvent, PropsWithChildren, useContext, useMemo, useRef, useState } from "react";
import { ActionIcon, Collapse, Group, Textarea, TextareaProps, ThemeIcon } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { IconNote } from "@tabler/icons-react";

import { FeatureFlag, FLAGS } from "@/configs/feature-flag";
import { NoteContext } from "@/features/study-sets/components/note-zone/context";
import { Question } from "@/features/study-sets/domains/question";
import useCreateNote from "@/features/study-sets/hooks/use-create-note";

type Props = PropsWithChildren & {
  domain: Question;
};

function Provider({ children, domain }: Props) {
  const [opened, setOpened] = useState(!!domain.note);
  const [text, setText] = useState(domain.note || "");
  const lastContent = useRef<string>(domain.note || "");
  const mutation = useCreateNote();

  const value = useMemo(
    () => ({
      opened,
      close: () => {
        if (text.trim().length === 0) setOpened(false);

        if (domain.id && lastContent.current !== text) {
          mutation.mutate({
            note: text,
            question_id: domain.id,
          });
          lastContent.current = text;
        }
      },
      toggle: () => setOpened((open) => !open),
      open: () => setOpened(true),
      text,
      setText,
    }),
    [domain.id, mutation, opened, text],
  );

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

function Trigger() {
  const { open } = useContext(NoteContext);

  return (
    <FeatureFlag feature={FLAGS.NOTE}>
      <ActionIcon size="3rem" onClick={open}>
        <IconNote size="1.125rem" />
      </ActionIcon>
    </FeatureFlag>
  );
}

function Input(props: TextareaProps) {
  const { opened, setText, text, close } = useContext(NoteContext);
  const ref = useClickOutside<HTMLTextAreaElement>(() => {
    close();
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <FeatureFlag feature={FLAGS.NOTE}>
      <Collapse in={opened}>
        <Group noWrap align="start">
          <ThemeIcon size="lg">
            <IconNote size="1.125rem" />
          </ThemeIcon>
          <Textarea value={text} ref={ref} onChange={handleChange} {...props} />
        </Group>
      </Collapse>
    </FeatureFlag>
  );
}

const NoteZone = Object.assign(
  {},
  {
    Provider,
    Trigger,
    Textarea: Input,
  },
);

export default NoteZone;
