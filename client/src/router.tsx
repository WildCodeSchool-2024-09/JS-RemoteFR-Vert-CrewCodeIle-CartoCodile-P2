import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import About from "./pages/About";
import Game from "./pages/Game";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/Game",
        element: <Game />,
      },
    ],
  },
]);
