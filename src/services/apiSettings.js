import {
  getMockSettings,
  updateMockSettings,
} from "../data/mockData";

export async function getSettings() {
  return getMockSettings();
}

export async function updateSetting(newSetting) {
  return updateMockSettings(newSetting);
}