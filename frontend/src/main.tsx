import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { routes } from "./routes";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
