import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Song } from "./pages/Songs";
import Login from "./pages/Login";

export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/songs", element: <Song /> },
      { path: "/", element: <Login /> },
    ],
  },
]);
