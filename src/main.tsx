import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./Login";
import Board from "./Board";
import { ModalManager } from "@pega/cosmos-react-core";

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
          <ModalManager>
            <AppRoutes />
          </ModalManager>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
);
