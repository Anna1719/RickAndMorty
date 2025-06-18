import { createBrowserRouter } from "react-router-dom";
import { SearchPage } from "@/pages/searchPage";
import { CharacterPage } from "@/pages/characterPage";
import { MainLayout } from "@/layouts/mainLayout";

export const ROUTES = {
  HOME: "/",
  CHARACTER: "/character/:id",
};

export const routes = [
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        element: <SearchPage />,
        index: true,
      },
      {
        path: ROUTES.CHARACTER,
        element: <CharacterPage />,
      },
      {
        path: "*",
        element: <div>404 Not Found</div>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
