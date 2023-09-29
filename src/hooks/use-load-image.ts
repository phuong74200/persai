import { useCallback, useState } from "react";

export default function useLoadImage(src: string) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [error, setError] = useState<string | Event | null>(null);

  const loadImage = useCallback(() => {
    const img = new Image();
    img.onload = () => setImage(img);
    img.onerror = (e) => setError(e);
    img.src = src;
  }, [src]);

  return { image, error, loadImage };
}
