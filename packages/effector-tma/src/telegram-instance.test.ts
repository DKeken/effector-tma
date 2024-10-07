import { describe, it, expect, vi, afterEach } from "vitest";
import { allSettled, fork } from "effector";
import {
  telegramInitializeRequested,
  $telegramWebApp,
  $telegramInitStatus,
} from "./telegram-instance";

describe("Telegram Instance", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize Telegram WebApp when requested", async () => {
    const scope = fork();

    await allSettled(telegramInitializeRequested, { scope });

    expect(scope.getState($telegramInitStatus)).toBe("done");
    expect(scope.getState($telegramWebApp)).toBeDefined();
  });

  it("should handle non-browser environment", async () => {
    vi.mock("./utils/is-browser", () => ({
      isBrowser: false,
    }));

    const scope = fork();

    const consoleSpy = vi.spyOn(console, "warn");

    await allSettled(telegramInitializeRequested, { scope });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Attempted to access Telegram WebApp in a non-browser environment"
    );
    expect(scope.getState($telegramInitStatus)).toBe("done");
  });
});
