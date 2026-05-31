import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home/Home";
import Projects from "@/pages/Projects/Projects";
import About from "@/pages/About/About";
import Me from "@/pages/Me/Me";
import NotFound from "@/pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/projects", element: <Projects /> },
      { path: "/about", element: <About /> },
      { path: "/me", element: <Me /> },

      // redirects (manteniendo compatibilidad)
      { path: "/Projects", element: <Navigate to="/projects" replace /> },
      { path: "/About", element: <Navigate to="/about" replace /> },
      { path: "/Me", element: <Navigate to="/me" replace /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
