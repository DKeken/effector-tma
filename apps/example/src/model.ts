import { createEvent, sample } from "effector";
import { createGate } from "effector-react";
import {
  telegramInitializeRequested,
  createTelegramEvent,
} from "effector-telegram-mini-app";

export const PageStartGate = createGate("PageStartGate");

sample({
  clock: PageStartGate.open,
  target: telegramInitializeRequested,
});

const viewportChanged = createEvent<void>();

export const { event: onViewportChanged, store: $viewportChanged } =
  createTelegramEvent("viewportChanged", viewportChanged);

export const { event: onThemeChanged, store: $themeChanged } =
  createTelegramEvent("themeChanged");

sample({
  clock: onThemeChanged,
  fn: (payload) => {
    console.log("onThemeChanged", payload);
  },
});
