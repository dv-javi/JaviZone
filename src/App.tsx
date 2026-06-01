import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SpeedInsights } from "@vercel/speed-insights/react";
import MainLayout from "@/layouts/MainLayout";
import AppBackgroundGate from "@/components/ui/Backgrounds/MonochromeBackground/AppBackgroundGate";
import { appRouteChildren } from "@/router/routes";

function AppRouteShell() {
  return (
    <>
      <MainLayout />
      <AppBackgroundGate />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <AppRouteShell />,
    children: appRouteChildren,
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
      <SpeedInsights />
    </HelmetProvider>
  );
}
