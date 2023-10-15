import { components } from "@/api/v1";
import dayjs from "@/configs/dayjs";

export class User {
  public createdAt;
  public earnedMoney;
  public email;
  public enabled;
  public feImageName;
  public fullName;
  public id;
  public role;
  public status;
  public updatedAt;
  public gptRemainingUsage;
  public referralCode;
  public subscription;
  public theme;

  constructor({
    createdAt,
    earnedMoney,
    email,
    enabled,
    feImageName,
    fullName,
    id,
    role,
    status,
    updatedAt,
    gptRemainingUsage,
    referralCode,
    subscription,
    theme,
  }: components["schemas"]["UserResponse"]) {
    this.createdAt = createdAt;
    this.earnedMoney = earnedMoney;
    this.email = email;
    this.enabled = enabled;
    this.feImageName = feImageName;
    this.fullName = fullName;
    this.id = id;
    this.role = role;
    this.status = status;
    this.updatedAt = updatedAt;
    this.gptRemainingUsage = gptRemainingUsage;
    this.referralCode = referralCode;
    this.subscription = subscription;
    this.theme = theme;
  }

  get body() {
    const subList = ["referral_code"];
    const excludeList = ["createdAt", "updatedAt", "id", "fullName", "referralCode"];

    return Object.keys(this)
      .concat(subList)
      .filter((key) => !excludeList.includes(key))
      .map((key) => key as keyof User);
  }

  field(key: keyof User) {
    return this[key];
  }

  get referral_code() {
    return this.referralCode?.referralCode;
  }

  get isPremium() {
    return this.subscription?.currentSubscriptionId !== "BASIC";
  }

  get userTheme() {
    return this.theme?.toLowerCase() === "default" ? "green" : this.theme?.toLowerCase();
  }

  get subscriptionExpireDate() {
    return dayjs(this.subscription?.expiredDatetime).format("DD MMM YYYY");
  }
}
