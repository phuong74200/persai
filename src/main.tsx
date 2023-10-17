import { createRoot } from "react-dom/client";
import ReactGA from "react-ga4";
import * as Sentry from "@sentry/react";

import App from "@/app";

ReactGA.initialize("G-59WCR3E2N7");

Sentry.init({
  dsn: "https://0a1d6ab5f5e443a0e9582fa318da7eaf@o4506064321445888.ingest.sentry.io/4506064322297856",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/(?:www.)?persai\.space/gi],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(<App />);
