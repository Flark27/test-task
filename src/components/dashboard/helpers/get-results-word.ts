export const getResultsWord = (count: number): string => {
  const lastTwo = count % 100;
  const lastOne = count % 10;

  if (lastTwo >= 11 && lastTwo <= 19) {
    return "результатов";
  }

  if (lastOne === 1) {
    return "результат";
  }

  if (lastOne >= 2 && lastOne <= 4) {
    return "результата";
  }

  return "результатов";
};
