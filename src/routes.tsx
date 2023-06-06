import { HomeIcon, PlayIcon, ToolsIcon } from "./components/Icons";
import { Home, Play, Settings, Game, Lobby, Host } from "./pages";

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
  {
    path: "/game/:roomCode",
    element: <Game />,
  },
  {
    path: "/lobby/",
    element: <Host />,
  },
  {
    path: "/lobby/:roomCode",
    element: <Lobby />,
  },
];
