import { useCallback, useState } from "react";

interface ImageDropOptions {
  onDrop?: (files: File[]) => void;
}

type History = {
  blobs: string[];
  files: File[];
};

const revokeAll = (blobs: string[]) => {
  blobs.forEach((blob) => URL.revokeObjectURL(blob));
};

export default function useImageDrop({ onDrop }: ImageDropOptions = {}) {
  const [files, setFiles] = useState<File[]>([]);
  const [blobs, setBlobs] = useState<string[]>([]);
  const [history, setHistory] = useState<History>({
    blobs: [],
    files: [],
  });

  const handleDrop = useCallback(
    (files: File[]) => {
      revokeAll(blobs);

      const _blobs = files.map((files) => URL.createObjectURL(files));

      setBlobs(_blobs);
      setFiles(files);
      setHistory((history) => ({
        blobs: [...history.blobs, ..._blobs],
        files: [...history.files, ...files],
      }));

      if (typeof onDrop === "function") onDrop(files);
    },
    [blobs, onDrop],
  );

  return {
    handleDrop,
    files,
    blobs,
    history,
  };
}
