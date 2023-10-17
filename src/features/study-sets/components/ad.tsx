import { useEffect } from "react";
import * as Sentry from "@sentry/react";

const AdsComponent = () => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      Sentry.captureException(e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "block",
      }}
      data-ad-format="fluid"
      data-ad-layout-key="-6t+ed+2i-1n-4w"
      data-ad-client="ca-pub-1973987809831735"
      data-ad-slot="1617082468"
      data-adtest={import.meta.env.DEV ? "on" : "off"}
    ></ins>
  );
};

export default AdsComponent;
