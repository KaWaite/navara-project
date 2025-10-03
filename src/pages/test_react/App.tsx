import { ViewProvider } from "@navara/three_react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Layers } from "./Layers";

export const App = () => {
  return (
    <StrictMode>
      <ViewProvider shadow debug>
        <Layers />
      </ViewProvider>
    </StrictMode>
  );
};

const rootEl = document.getElementById("main");
if(rootEl) {
  createRoot(rootEl).render(<App />);
}
