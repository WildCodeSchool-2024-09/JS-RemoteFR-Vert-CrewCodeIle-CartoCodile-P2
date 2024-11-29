import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import About from "./pages/About";
import Gamepage from "./pages/Gamepage";
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
        path: "/Gamepage",
        element: <Gamepage />,
      },
      {
        path: "/About",
        element: <About />,
      },
    ],
  },
]);
