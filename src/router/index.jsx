import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/auth";
import ManagementAcara from "../pages/management/acara";
import DesktopApp from "../layout";
import ManagementPenyelenggara from "../pages/management/penyelenggara";
import ManagementUsers from "../pages/management/user";
import ReportingPenjualan from "../pages/reporting/penjualan";

const PrivateRouterDesktop = ({ children }) => {
  const token = localStorage.token;
  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

const PrivateAuth = ({ children }) => {
  const token = localStorage.token;

  if (token) {
    return <Navigate to={"/desktop/manajemen-acara"} />;
  } else {
    return children;
  }
};

const AppRouter = () => {
  const desktopRoutes = [
    {
      path: "/desktop",
      element: (
        <PrivateRouterDesktop>
          <DesktopApp />
        </PrivateRouterDesktop>
      ),
      children: [
        { path: "manajemen-acara", element: <ManagementAcara /> },
        {
          path: "manajemen-penyelenggara",
          element: <ManagementPenyelenggara />,
        },
        {
          path: "manajemen-user",
          element: <ManagementUsers />,
        },
        {
          path: "reporting-penjualan",
          element: <ReportingPenjualan />,
        },
      ],
    },
  ];
  const routers = useRoutes([
    {
      path: "/",
      element: <Navigate to={"/login"} />,
    },
    {
      path: "/login",
      element: (
        <PrivateAuth>
          <Login />
        </PrivateAuth>
      ),
    },
    ...desktopRoutes,
  ]);

  return routers;
};

export default AppRouter;
