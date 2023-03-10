import React, { FC, useMemo } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectRoute";
import Redirect from "./Redirect";
import SignIn from "../pages/signin";
import Dashboard from "../pages/dasboard";

const ROUTES = {
  HOME: "/",
  SIGNIN: "signin",
  DASHBOARD: "dashboard",
};

const AppRoutes = () => {
  const routerConfig = [
    {
      path: ROUTES.HOME,
      element: (
        <Redirect
          condition={!!localStorage.getItem("ID")}
          to={ROUTES.DASHBOARD}
        />
      ),
    },
    {
      path: ROUTES.HOME,
      element: (
        <ProtectedRoute
          condition={!!localStorage.getItem("ID")}
          redirectTo={ROUTES.HOME}
        ></ProtectedRoute>
      ),
    },
  ];
  const routerClients = createBrowserRouter([
    ...routerConfig,
    {
      path: ROUTES.HOME,
      children: [
        {
          path: ROUTES.DASHBOARD,
          element: <Dashboard />,
        },
        {
          path: ROUTES.SIGNIN,
          element: <SignIn />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routerClients} />;
};
export default AppRoutes;
