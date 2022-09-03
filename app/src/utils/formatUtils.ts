export const numberWithCommas = (value: number) => {
  "worklet";

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
