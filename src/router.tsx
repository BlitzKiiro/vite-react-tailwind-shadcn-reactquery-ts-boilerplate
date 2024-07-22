import { createBrowserRouter, RouterProvider } from "react-router-dom";
// lib
import { useQuery } from "@tanstack/react-query";
import { AuthData } from "@/api/types/user";

// layouts
import MainLayout from "@/Layouts/main";
// pages
import Home from "@/pages/home";
import ErrorElement from "@/pages/error/error";
import Login from "@/pages/login/login";

// components
import UnAuthedRoute from "@/components/auth/UnAuthedRoute";
import AuthedRoute from "@/components/auth/AuthedRoute";

const AppRouter = () => {
  const { data: user, isLoading: isUserLoading } = useQuery<AuthData>({
    queryKey: ["user"],
  });

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorElement />, // Global error element
      children: [
        {
          path: "admin",
          element: <AuthedRoute user={user} />,
          children: [
            {
              path: "",
              element: <MainLayout />,
              children: [
                {
                  path: "",
                  element: <Home />,
                },
              ],
            },
          ],
        },
        {
          path: "admin/auth",
          element: <UnAuthedRoute user={user} />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
