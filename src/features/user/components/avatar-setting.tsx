import { Avatar, Box, FileButton, LoadingOverlay } from "@mantine/core";

import { useGetCurrentUserFromCache } from "@/features/auth/hooks/use-get-current-user";
import useUpdateAvatar from "@/features/user/hooks/use-update-avatar";

export default function AvatarSetting() {
  const cache = useGetCurrentUserFromCache();

  const { submit, isLoading } = useUpdateAvatar();

  return (
    <FileButton onChange={submit} multiple={false} accept="image/png,image/jpeg">
      {(props) => (
        <Box className="relative h-[8.75rem] w-[8.75rem] overflow-hidden rounded-[50%]">
          <LoadingOverlay visible={isLoading} />
          <Avatar
            className="cursor-pointer"
            radius="50%"
            size="8.75rem"
            src={cache?.feImageName}
            {...props}
          />
        </Box>
      )}
    </FileButton>
  );
}
