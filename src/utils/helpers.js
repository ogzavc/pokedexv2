export const idFormatter = (id) => {
  if (id) {
    return `#${id.toString().padStart(3, "0")}`;
  } else return "####";
};
