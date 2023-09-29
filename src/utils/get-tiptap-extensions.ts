// import { Link } from "@mantine/tiptap";
// import Highlight from "@tiptap/extension-highlight";
// import SubScript from "@tiptap/extension-subscript";
// import Superscript from "@tiptap/extension-superscript";
// import TextAlign from "@tiptap/extension-text-align";
// import Underline from "@tiptap/extension-underline";
// import { Extensions } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";

// import { TipTapCustomImage } from "@/modules/tiptap-custom-image";
// import handleUpload from "@/utils/handle-upload";

// interface GetTipTapExtensions {
//   withImage?: boolean;
// }

// export function getTipTapExtensions({ withImage }: GetTipTapExtensions) {
//   let extensions: Extensions;

//   if (withImage) {
//     extensions = [
//       StarterKit,
//       Underline,
//       Link,
//       Superscript,
//       SubScript,
//       Highlight,
//       TextAlign.configure({ types: ["heading", "paragraph"] }),
//       TipTapCustomImage(handleUpload),
//     ];
//   } else {
//     extensions = [
//       StarterKit,
//       Underline,
//       Link,
//       Superscript,
//       SubScript,
//       Highlight,
//       TextAlign.configure({ types: ["heading", "paragraph"] }),
//     ];
//   }

//   return extensions;
// }
