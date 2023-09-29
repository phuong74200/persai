type Unit = "hundred" | "thousand";

const getUnits = (unit: Unit) => {
  switch (unit) {
    case "hundred":
      return 100;
    case "thousand":
      return 1000;
  }
};

export default function ronudCurrency(amount: number, units: Unit | number) {
  if (typeof units === "number") return Math.round(amount / units) * units;
  return Math.round(amount / getUnits(units)) * getUnits(units);
}
