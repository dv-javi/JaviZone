import { useLocation } from "react-router-dom";
import MonochromeBackground from "./MonochromeBackground";

/**
 * Renders the animated monochrome layer only outside Home (/).
 * Mounted after route content in the router shell so it stacks above
 * `.general-background` but below in-flow page UI.
 */
export default function AppBackgroundGate() {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return null;
  }

  return <MonochromeBackground />;
}
