import { Themes } from "./theme-types";

export const darkOrLight = (theme: Themes): boolean => {
  switch (theme) {
    case Themes.Dark:
      return true;
    case Themes.Light:
      return false;
    case Themes.Retro:
      return false;
    case Themes.Abyss:
      return true;
    case Themes.Cyberpunk:
      return true;
    case Themes.Valintine:
      return false;
    case Themes.Forest:
      return true;
    case Themes.Black:
      return true;
    case Themes.Nord:
      return false;
    default:
      return false;
  }
};
