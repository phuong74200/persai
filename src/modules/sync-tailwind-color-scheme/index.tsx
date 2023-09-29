import { useEffect } from "react";

interface Props {
  scheme: "dark" | "light";
}

export default function SyncTailwindColorScheme({ scheme }: Props) {
  useEffect(() => {
    if (scheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [scheme]);
  return <></>;
}
