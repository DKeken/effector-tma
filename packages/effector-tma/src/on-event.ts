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
  const callbackEffect = createEffect<T, void>();

  const initializeCallbackEffect = () => {
    if (callback) {
      callbackEffect.use((payload: T) => {
        if (is.event(callback)) {
          throw new Error(
            "Callback is an event, but it's being called from an effect. This may lead to unexpected behavior or logic issues."
          );
        }
        return callback(payload);
      });
    }
  };

  const configureEventHandling = () => {
    if (callback) {
      sample({
        source: telegramEvent,
        filter: () => !is.event(callback),
        target: callbackEffect,
      });

      sample({
        source: telegramEvent,
        filter: () => is.event(callback),
        target: callback as EventCallable<T>,
      });
    }
  };

  const attachTelegramEventListener = () => {
    sample({
      clock: $telegramWebApp,
      source: $telegramEventStore,
      filter: (source, clock) => Boolean(clock),
      fn: (source, clock) => {
        if (clock) {
          const eventHandler = (payload: T) => {
            console.log("eventHandler", payload);
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

  initializeCallbackEffect();
  configureEventHandling();
  attachTelegramEventListener();

  return {
    event: telegramEvent,
    store: $telegramEventStore,
  };
}
