import { lightTheme } from "./themes";

export const getTheme = () => {
  return lightTheme;
  // const userPreference = localStorage.getItem("spellbound-theme-pref");
  //   let resultingTheme: Theme;

  //   if (userPreference === "light" || userPreference === "dark") {
  //     // If this storage exists then they have a theme preference
  //     if (userPreference === "light") {
  //       resultingTheme = LightTheme;
  //     } else {
  //       resultingTheme = DarkTheme;
  //     }
  //   } else {
  //     // There is no item in local storage so we will default to media queries
  //     if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //       resultingTheme = DarkTheme;
  //     } else {
  //       resultingTheme = LightTheme;
  //     }
  //   }

  //   const today = new Date();
  //   const month = today.getMonth() + 1;
  //   const day = today.getDate();

  //   if ((month === 10 && day === 31) || userPreference === "halloween") {
  //     // Halloween
  //     // Override the blue to a nice halloween orange
  //     resultingTheme.colors.blue = {
  //       normal: "#eb6123",
  //       hovered: "#d74d0f",
  //       disabled: "#ff7537",
  //     };
  //   }

  //   return resultingTheme;
};
