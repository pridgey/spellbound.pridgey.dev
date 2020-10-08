export const numberOrStringToCSS = (
  value?: number | string,
  defaultValue?: string
) => {
  return value ? `${value}${Number(value) ? "px" : ""}` : defaultValue;
};
