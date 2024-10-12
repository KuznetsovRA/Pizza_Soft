export const formatDateForInput = (dateString) => {
  const [day, month, year] = dateString.split(".");
  return `${year}-${month}-${day}`; // YYYY-MM-DD
};

export const formatDateFromInput = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`; // MM.DD.YYYY
};

export const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, "");
  const match = cleaned.match(/^(\d)(\d{3})(\d{3})(\d{4})$/);

  if (cleaned.length > 11) {
    return value.slice(0, 17); // Возвращаем исходное значение, если длина не соответствует формату
  }

  if (match) {
    return `+7 (${match[2]}) ${match[3]}-${match[4]}`;
  }

  return value;
};
