import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login.tsx'
// import './index.css'
import { BrowserRouter, useRoutes } from "react-router-dom";
import Board from "./Board.tsx";

function AppRoutes() {
  const element = useRoutes([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/board',
      element: <Board />
    },
  ]);

  return element;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>,
)
