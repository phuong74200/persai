import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

import App from "@/app";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Analytics />
  </>,
);
