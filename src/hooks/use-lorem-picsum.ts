import { useEffect, useState } from "react";

import logger from "@/utils/dev-log";

export default function useLoremPicsum({
  width = 300,
  height = 300,
}: {
  width: number;
  height: number;
}) {
  const [url, setURL] = useState("");

  useEffect(() => {
    fetch(`https://picsum.photos/${width}/${height}`)
      .then((res) => {
        setURL(res.url);
      })
      .catch((err) => {
        logger.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return url;
}
