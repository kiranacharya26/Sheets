export const evaluateFormula = (formula, data) => {
  if (formula.startsWith("=")) {
    try {
      const expression = formula
        .slice(1)
        .replace(/([A-Z]\d+)/g, (match) => data[match] || "0");
      return eval(expression);
    } catch {
      return "ERR";
    }
  }
  return formula;
};
