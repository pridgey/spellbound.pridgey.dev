export const limitStringLength = (
  str: string,
  limit: number,
  suffix?: string
) => {
  return `${str.substring(0, limit)}${
    str.length > limit ? suffix || "..." : ""
  }`;
};
