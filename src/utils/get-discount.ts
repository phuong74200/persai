export function getDiscountedPrice(price: number, discount = 0) {
  return (price * (100 - discount)) / 100;
}

export function getDiscountedValue(price: number, discount = 0) {
  return price * (discount / 100);
}
