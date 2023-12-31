import { useContext } from "react";

import FeatureFlagManager, { FeatureFlagManagerType } from "@/modules/feature-flag-manager";

export enum FLAGS {
  NOTE = "note",
  EXCEL = "excel",
  LOGIN_PARTICLES = "login-particles",
  NOTIFICATION = "notification",
  BOOKS = "books",
  CHAT_GPT = "chat-gpt",
  ADVERTISEMENT = "advertisement",
}

const featureFlagManager = new FeatureFlagManager({
  [FLAGS.NOTE]: true,
  [FLAGS.EXCEL]: true,
  [FLAGS.LOGIN_PARTICLES]: false,
  [FLAGS.NOTIFICATION]: false,
  [FLAGS.BOOKS]: false,
  [FLAGS.CHAT_GPT]: true,
  [FLAGS.ADVERTISEMENT]: false,
});

export const FeatureFlagProvider = featureFlagManager.FeatureFlagProvider;
export const FeatureFlag = featureFlagManager.FeatureFlag;
export const FeatureFlagContext = featureFlagManager.FeatureFlagContext;

export type Feature = FeatureFlagManagerType<typeof featureFlagManager>;

export const useFeatureFlagContext = () => useContext(FeatureFlagContext);
export const useFeatureFlag = featureFlagManager.useFeatureFlag;
export const useFeatureFlags = featureFlagManager.useFeatureFlags;
export const useHelper = featureFlagManager.useHelper;
