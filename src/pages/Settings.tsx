import { useNavigate } from "react-router-dom";
import { GoBack } from "../components/GoBack";
import { ThemeSelect } from "../components/ThemeSelect";
import { GoHome } from "../components/GoHome";

export const allThemes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

export const Settings = () => {
  let navigate = useNavigate();

  return (
    <>
      <GoBack onClick={() => navigate("/")} text="Back" />
      <div className="grow w-full">
        <div>Theme</div>
        <ThemeSelect />
      </div>
      <GoHome />
    </>
  );
};
