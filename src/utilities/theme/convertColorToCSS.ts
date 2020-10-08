export const convertColorToCSS = (color: any) => {
  return `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;
};
