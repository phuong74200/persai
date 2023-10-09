import { useState } from "react";

export default function useBase64(file: File | undefined) {
  const [base64, setBase64] = useState<string | undefined>(undefined);

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64data = reader.result;
      setBase64(base64data?.toString());
    };
  }

  return base64;
}
