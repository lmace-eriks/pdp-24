export const trailingZero = (price: string | undefined) => {
  if (!price) return "";

  const hasDecimal = price.includes(".");
  if (!hasDecimal) return "";

  const afterDecimal = price.split(".")[1];
  const afterDecimalPlaces = afterDecimal.length;
  const invalidPrice = afterDecimalPlaces !== 2;

  return invalidPrice ? "0" : "";
};
