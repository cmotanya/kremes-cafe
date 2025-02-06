export const useCurrency = () => {
  const priceCurrency = (price: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 2,
    }).format(price);

  return priceCurrency;
};
