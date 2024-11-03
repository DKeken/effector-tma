import { createEffect } from "effector";
import { $telegramWebApp } from "../telegram-instance";
import type { HapticImpactStyle, HapticNotificationType } from "../utils/types";

const impactOccurredFx = createEffect<HapticImpactStyle, void>();
const notificationOccurredFx = createEffect<HapticNotificationType, void>();
const selectionChangedFx = createEffect<void, void>();

impactOccurredFx.use(async (style) => {
  const telegram = $telegramWebApp.getState();
  if (!telegram?.WebApp.HapticFeedback) {
    throw new Error("Haptic Feedback is not available");
  }

  telegram.WebApp.HapticFeedback.impactOccurred(style);
});

notificationOccurredFx.use(async (type) => {
  const telegram = $telegramWebApp.getState();
  if (!telegram?.WebApp.HapticFeedback) {
    throw new Error("Haptic Feedback is not available");
  }

  telegram.WebApp.HapticFeedback.notificationOccurred(type);
});

selectionChangedFx.use(async () => {
  const telegram = $telegramWebApp.getState();
  if (!telegram?.WebApp.HapticFeedback) {
    throw new Error("Haptic Feedback is not available");
  }

  telegram.WebApp.HapticFeedback.selectionChanged();
});

export const hapticFeedback = {
  impactOccurred: impactOccurredFx,
  notificationOccurred: notificationOccurredFx,
  selectionChanged: selectionChangedFx,
};
