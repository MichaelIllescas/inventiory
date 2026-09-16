export const formatDate = (value) => {
  if (!value) return "-";

  const datePart = String(value).slice(0, 10);
  const [year, month, day] = datePart.split("-");

  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
};
