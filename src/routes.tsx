import { HomeIcon, PlayIcon, ToolsIcon } from "./components/Icons";
import { Home, Play, Settings } from "./pages";

export const routes = [
  {
    icon: <HomeIcon />,
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    icon: <PlayIcon />,
    name: "Play",
    path: "/play",
    element: <Play />,
  },
  {
    icon: <ToolsIcon />,
    name: "Settings",
    path: "/settings",
    element: <Settings />,
  },
];
