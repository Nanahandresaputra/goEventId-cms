import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/auth";

const AppRouter = () => {
  const routers = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return routers;
};

export default AppRouter;
