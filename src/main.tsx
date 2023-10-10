import { createRoot } from "react-dom/client";
import { initialize } from "react-ga";

import App from "@/app";

initialize("G-59WCR3E2N7", { debug: true });

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(<App />);
