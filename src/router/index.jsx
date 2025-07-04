import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/auth";
import ManagementAcara from "../pages/management/acara";
import DesktopApp from "../layout";
import ManagementPenyelenggara from "../pages/management/penyelenggara";
import ManagementUsers from "../pages/management/user";

const AppRouter = () => {
  const desktopRoutes = [
    {
      path: "/desktop",
      element: (
        // <PrivateRouterDesktop>
        <DesktopApp />
        // </PrivateRouterDesktop>
      ),
      children: [
        // { path: "manajemen-shift-pengguna", element: <MangementUserShift /> },
        { path: "manajemen-acara", element: <ManagementAcara /> },
        {
          path: "manajemen-penyelenggara",
          element: <ManagementPenyelenggara />,
        },
        {
          path: "manajemen-user",
          element: <ManagementUsers />,
        },
      ],
    },
  ];
  const routers = useRoutes([
    ...desktopRoutes,
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return routers;
};

export default AppRouter;
