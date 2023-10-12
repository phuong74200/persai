import { components } from "@/api/v1";

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
    const subList = ["test"];
    const excludeList = ["createdAt", "updatedAt", "id", "fullName"];

    return Object.keys(this)
      .concat(subList)
      .filter((key) => !excludeList.includes(key))
      .map((key) => key as keyof User);
  }

  field(key: keyof User) {
    return this[key];
  }

  get test() {
    return this.fullName;
  }

  get isPremium() {
    return this.subscription?.currentSubscriptionId !== "BASIC";
  }

  get userTheme() {
    const theme = this.theme?.split(".")?.[1]?.toLowerCase();

    return this.theme?.toLowerCase();
  }
}
