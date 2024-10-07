import {
  createEffect,
  createEvent,
  is,
  restore,
  sample,
  type EventCallable,
} from "effector";
import { $telegramWebApp } from "./telegram-instance";
import type { WebAppEventType } from "./utils/types";

export function createTelegramEvent<T>(
  eventType: WebAppEventType,
  callback?: ((payload: T) => void) | EventCallable<T>
) {
  const telegramEvent = createEvent<T>(`telegram${eventType}Event`);
  const $telegramEventStore = restore(telegramEvent, null);

  const configureEventHandling = () => {
    if (typeof callback !== "function") {
      throw new Error("callback should be a function");
    }

    const callbackFx = createEffect((data: T) => callback(data));

    sample({
      clock: telegramEvent,
      target: callbackFx,
    });
  };

  const attachTelegramEventListener = () => {
    sample({
      clock: $telegramWebApp,
      source: $telegramEventStore,
      filter: (_, clock) => Boolean(clock),
      fn: (_, clock) => {
        if (clock) {
          const eventHandler = (payload: T) => {
            if (payload === undefined) {
              telegramEvent(`${eventType} - called` as unknown as T);
            } else {
              telegramEvent(payload);
            }
          };

          clock.WebApp.offEvent(eventType, eventHandler);
          clock.WebApp.onEvent(eventType, eventHandler);
        } else {
          throw new Error("Telegram WebApp is not initialized");
        }
      },
    });
  };

  if (callback) {
    configureEventHandling();
  }

  attachTelegramEventListener();

  return {
    event: telegramEvent,
    store: $telegramEventStore,
  };
}
