import { components } from "@/api/v1";

export class Subscription {
  description;
  gptLimit;
  gptModel;
  id;
  pricePerMonth;
  pricePerYear;
  subscriptionName;
  supportedFeatures;

  constructor({
    description,
    gptLimit,
    gptModel,
    id,
    pricePerMonth,
    pricePerYear,
    subscriptionName,
    supportedFeatures,
  }: components["schemas"]["SubscriptionResponse"]) {
    this.description = description;
    this.gptLimit = gptLimit;
    this.gptModel = gptModel;
    this.id = id;
    this.pricePerMonth = pricePerMonth;
    this.pricePerYear = pricePerYear;
    this.subscriptionName = subscriptionName;
    this.supportedFeatures = supportedFeatures;
  }
}
