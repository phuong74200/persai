// import { useState } from "react";
// import { Editor } from "@tiptap/react";

// import useAsyncEffect from "@/hooks/use-async-effect";
// import handleUpload from "@/utils/handle-upload";

// export default function useEditorImage(editor: Editor | null) {
//   const [image, setImage] = useState<File | undefined>();

//   useAsyncEffect(async () => {
//     if (image && editor) {
//       const src = await handleUpload(image);
//       editor.chain().focus()?.setImage({ src })?.run();
//     }
//   }, []);

//   return [image, setImage];
// }
