export const lightTheme = new Proxy(
  {
    blue: {
      hue: 208,
      saturation: 25,
      lightness: 45,
    },
    green: {
      hue: 162,
      saturation: 43,
      lightness: 46,
    },
    yellow: {
      hue: 42,
      saturation: 93,
      lightness: 64,
    },
    red: {
      hue: 359,
      saturation: 94,
      lightness: 62,
    },
  },
  {
    get: (obj, prop) => {
      return prop in obj
        ? convertColorToCSS(obj[prop])
        : convertColorToCSS(obj.blue);
    },
  }
);

const convertColorToCSS = (color: any) => {
  return `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;
};
