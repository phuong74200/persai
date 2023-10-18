import { useEffect } from "react";
import * as Sentry from "@sentry/react";

import { FeatureFlag, FLAGS } from "@/configs/feature-flag";

const AdsComponent = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      Sentry.captureException(e);
    }
  }, []);

  return (
    <FeatureFlag feature={FLAGS.ADVERTISEMENT}>
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
    </FeatureFlag>
  );
};

export default AdsComponent;
