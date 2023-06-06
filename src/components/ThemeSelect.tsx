import { useEffect } from "react";
import { themeChange } from "theme-change";
import { allThemes } from "../pages/Settings";

export function ThemeSelect() {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  return (
    <select
      data-choose-theme
      className="select select-bordered border-primary focus:outline-primary w-full"
      defaultValue={"dark"}
    >
      {allThemes.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
