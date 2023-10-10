import { createRoot } from "react-dom/client";
import ReactGA from "react-ga4";

import App from "@/app";

ReactGA.initialize("G-59WCR3E2N7");

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(<App />);
