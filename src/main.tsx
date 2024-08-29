import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./Login";
import Board from "./Board";

function AppRoutes() {
  const element = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/board",
      element: <Board />,
    },
  ]);

  return element;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
