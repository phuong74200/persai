import { components } from "@/api/v1";

export class UpgradeRequest {
  id;
  paidType;
  status;
  userResponse;

  constructor({
    id,
    paidType,
    status,
    userResponse,
  }: components["schemas"]["UpgradeRequestResponse"]) {
    this.id = id;
    this.paidType = paidType;
    this.status = status;
    this.userResponse = userResponse;
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
    }

    return "blue";
  }
}
