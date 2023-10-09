import { UseFormReturn } from "react-hook-form";
import { FileButton, Image, ThemeIcon, Tooltip } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";

import useBase64 from "@/features/study-sets/hooks/use-base64";
import { CreateSetFormType } from "@/features/study-sets/types/create-set-form-type";

type Props = {
  form: UseFormReturn<CreateSetFormType, unknown, undefined>;
};

export default function SetImage({ form }: Props) {
  const image = form.watch("image");
  const base64 = useBase64(image);

  const setFile = (file: File) => {
    form.setValue("image", file);
  };

  return (
    <FileButton onChange={setFile} accept="image/png,image/jpeg">
      {(props) => (
        <Tooltip.Floating label={image?.name ?? "Upload image"}>
          <Image
            className="cursor-pointer"
            placeholder={
              <ThemeIcon w="100%" h="100%">
                <IconPhoto size="2rem" />
              </ThemeIcon>
            }
            withPlaceholder
            width="4.875rem"
            height="4.875rem"
            src={base64}
            {...props}
          />
        </Tooltip.Floating>
      )}
    </FileButton>
  );
}