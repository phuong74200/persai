import { components } from "@/api/v1";

export class UpgradeRequest {
  id;
  paidType;
  status;
  userResponse;
  createdAt;
  price;

  constructor({
    id,
    paidType,
    status,
    userResponse,
    createdAt,
    price,
  }: components["schemas"]["UpgradeRequestResponse"]) {
    this.id = id;
    this.paidType = paidType;
    this.status = status;
    this.userResponse = userResponse;
    this.createdAt = createdAt;
    this.price = price;
  }

  get isPending() {
    return this.status === "PENDING";
  }

  get statusColor() {
    switch (this.status) {
      case "PENDING":
        return "orange";
      case "SUCCEED":
        return "green";
      case "REJECT":
        return "red";
    }

    return "blue";
  }

  get formatPrice() {
    if (!this.price) return 0;
    return new Intl.NumberFormat("en-DE").format(this.price);
  }
}
