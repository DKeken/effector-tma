import { createEffect, createEvent, restore, sample } from "effector";
import { isBrowser } from "./utils/is-browser";
import type { TelegramWebAppRoot } from "./utils/types";
import { status } from "patronum/status";

const initTelegramFx = createEffect<void, TelegramWebAppRoot>();
export const telegramInitializeRequested = createEvent<void>();
export const $telegramWebApp = restore(initTelegramFx.doneData, null);
export const $telegramInitStatus = status({ effect: initTelegramFx });

initTelegramFx.use(() => {
  if (!isBrowser || !(window as any).Telegram) {
    console.warn(
      "Attempted to access Telegram WebApp in a non-browser environment"
    );
  }

  const telegramWebAppRoot = (window as any).Telegram as TelegramWebAppRoot;

  telegramWebAppRoot.WebApp.ready();
  return telegramWebAppRoot;
});

sample({
  clock: telegramInitializeRequested,
  target: initTelegramFx,
});
