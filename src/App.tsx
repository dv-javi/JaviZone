import { RouterProvider } from "react-router-dom";
import { router } from "@/router/routes";
import { HelmetProvider } from "react-helmet-async";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
      <SpeedInsights />
    </HelmetProvider>
  );
}
