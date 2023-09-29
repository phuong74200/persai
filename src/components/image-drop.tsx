// import { useState } from "react";
// import { Avatar, Center, Flex } from "@mantine/core";
// import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
// import { UseFormReturnType } from "@mantine/form";
// import { notifications } from "@mantine/notifications";
// import { IconCheck } from "@tabler/icons-react";

// import useAsyncEffect from "@/hooks/use-async-effect";
// import { uploadImage } from "@/utils/cloudinary";

// interface ImageDropProps<T> {
//   children?: React.ReactNode;
//   noPreview?: boolean;
//   form: UseFormReturnType<
//     T & {
//       avatar: string;
//     }
//   >;
// }

// export default function ImageDrop<T>({ form, children, noPreview }: ImageDropProps<T>) {
//   const [files, setFiles] = useState<FileWithPath[]>([]);
//   const [img, setImg] = useState(form.values.avatar);

//   useAsyncEffect(async () => {
//     if (files.length === 0) return;
//     try {
//       notifications.show({
//         id: "uploading",
//         loading: true,
//         message: "Processing your image",
//         autoClose: false,
//         withCloseButton: false,
//       });
//       const image = await (await uploadImage(files[0])).json();
//       setImg(image.url);
//       if (form) form.setFieldValue("avatar", image.url);
//     } finally {
//       notifications.update({
//         id: "uploading",
//         message: "Your image uploaded",
//         color: "green",
//         icon: <IconCheck size="1rem" />,
//       });
//     }
//   }, [files]);

//   return (
//     <div>
//       <Flex gap={16}>
//         <Dropzone
//           styles={{ inner: { height: "100%" } }}
//           w="100%"
//           h={80}
//           accept={IMAGE_MIME_TYPE}
//           onDrop={setFiles}
//           multiple={false}
//         >
//           <Center w="100%" h="100%">
//             {children || "Drop your avatar here"}
//           </Center>
//         </Dropzone>
//         {noPreview === true ? null : (
//           <Avatar size={80} src={img}>
//             IM
//           </Avatar>
//         )}
//       </Flex>
//     </div>
//   );
// }
