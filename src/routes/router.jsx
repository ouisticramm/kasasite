import { createHashRouter, Outlet } from "react-router-dom";
import Home from "../Pages/Home";
import Header from "../Layout/Header";
import Main from "../Layout/Main";
import Footer from "../Layout/Footer";
import Apartment from "../Pages/Apartmentrental";
import About from "../Pages/About";
import ErrorPage from "../Pages/ErrorPage";

const HeaderFooterLayout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};

// Obtenez le basename à partir de l'environnement ou utilisez une chaîne vide par défaut
const basename = import.meta.env.BASE_URL || "/";

export const router = createHashRouter(
  [
    {
      path: "/",
      element: <HeaderFooterLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/apartment/:id",
          element: <Apartment />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ],
  { basename: basename }
);
