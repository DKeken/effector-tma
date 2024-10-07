import { describe, it, expect, vi, beforeEach } from "vitest";
import { createTelegramEvent } from "./on-event";
import { allSettled, fork, is } from "effector";
import { telegramInitializeRequested } from "./telegram-instance";

describe("createTelegramEvent", () => {
  beforeEach(() => {
    vi.stubGlobal("Telegram", {
      WebApp: {
        onEvent: vi.fn(),
        offEvent: vi.fn(),
        ready: vi.fn(),
      },
    });
  });

  it("should create a telegram event and store", async () => {
    const scope = fork();
    await allSettled(telegramInitializeRequested, { scope });

    const { event, store } = createTelegramEvent("mainButtonClicked");
    await allSettled(event, { scope, params: "test payload" });

    expect(is.event(event)).toBe(true);
    expect(is.store(store)).toBe(true);
  });

  it("should call the callback when the event is triggered", async () => {
    const callback = vi.fn();

    const scope = fork();
    await allSettled(telegramInitializeRequested, { scope });

    const { event } = createTelegramEvent("mainButtonClicked", callback);
    await allSettled(event, { scope, params: "test payload" });

    expect(callback).toHaveBeenCalledWith("test payload");
  });

  it("should attach event listener when telegramWebApp is available", async () => {
    const scope = fork();
    await allSettled(telegramInitializeRequested, { scope });

    const { event } = createTelegramEvent("mainButtonClicked");
    const mockedWebApp = (global as any).Telegram.WebApp;

    await allSettled(event, { scope, params: "test payload" });

    expect(mockedWebApp.onEvent).toHaveBeenCalledWith(
      "mainButtonClicked",
      expect.any(Function)
    );
  });
});
