import { ActionIcon, Box, CardProps, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";

import FavoriteCard from "@/features/study-sets/components/favorite-card";
import useDeleteStudySet from "@/features/study-sets/hooks/use-delete-study-set";
import { StudySet } from "@/shared/domains/study-set";
import emptyFn from "@/utils/empty-fn";

interface Props extends Omit<CardProps, "children"> {
  domain: StudySet;
}

export default function FavoriteCardWithDelete(props: Props) {
  const { remove } = useDeleteStudySet();

  const handleDelete = () => {
    modals.openConfirmModal({
      title: (
        <Text>
          Delete <b>{props.domain.studySetName}</b> set?
        </Text>
      ),
      children: <Text size="sm">This action can&apos;t be undone</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => emptyFn,
      onConfirm: () => {
        if (props.domain.id) remove(props.domain.id);
      },
    });
  };

  return (
    <Box className="group relative">
      <ActionIcon
        onClick={handleDelete}
        variant="filled"
        color="red"
        className="pointer-events-none absolute right-4 top-4 z-10 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100"
      >
        <IconTrash size="1rem" />
      </ActionIcon>
      <FavoriteCard {...props} />
    </Box>
  );
}
