import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx"
import "./css/style.css"
import Battle from "./pages/Battle.jsx";
import Fight from "./components/Fight.jsx";
import Bag from "./components/Bag.jsx"
import Pokemon from "./components/Pokemon.jsx"
import Run from "./components/Run.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "gameboy",
    element: <Battle />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "fight",
        element: <Fight />,
      },
      {
        path: "bag",
        element: <Bag />,
      },
      {
        path: "pokemon",
        element: <Pokemon />,
      },
      {
        path: "run",
        element: <Run />,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
