import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import MainLayout from "@/Layouts/main";
// pages
import Home from "@/pages/home";
import ErrorElement from "@/pages/error/error";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorElement />, // Global error element
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
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
