import { useContext } from "react";

import { FL_DEV, FL_TEST, MODE } from "@/configs/env";
import FeatureFlagManager, { FeatureFlagManagerType } from "@/modules/feature-flag-manager";

export enum FLAGS {
  PROFILE = "profile",
  DEV = "dev",
  DEV_DARK_MODE = "dev_dark_mode",
  TEST = "test",
  DEV_CUSTOM_THEME = "dev_custom_theme",
}

const featureFlagManager = new FeatureFlagManager({
  [FLAGS.PROFILE]: true,
  [FLAGS.DEV]: FL_DEV || MODE === "development",
  [FLAGS.TEST]: FL_TEST || MODE === "test",
  [FLAGS.DEV_DARK_MODE]: false,
  [FLAGS.DEV_CUSTOM_THEME]: true,
});

export const FeatureFlagProvider = featureFlagManager.FeatureFlagProvider;
export const FeatureFlag = featureFlagManager.FeatureFlag;
export const FeatureFlagContext = featureFlagManager.FeatureFlagContext;

export type Feature = FeatureFlagManagerType<typeof featureFlagManager>;

export const useFeatureFlagContext = () => useContext(FeatureFlagContext);
export const useFeatureFlag = featureFlagManager.useFeatureFlag;
export const useFeatureFlags = featureFlagManager.useFeatureFlags;
export const useHelper = featureFlagManager.useHelper;
