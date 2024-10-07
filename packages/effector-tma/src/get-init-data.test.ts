import { describe, it, expect, beforeEach, vi } from "vitest";
import { allSettled, fork } from "effector";
import { $initDataUnsafe, $initData } from "./get-init-data";
import { telegramInitializeRequested } from "./telegram-instance";

describe("getInitData", () => {
  beforeEach(() => {
    vi.stubGlobal("Telegram", {
      WebApp: {
        initDataUnsafe: { test: "unsafeData" },
        initData: "safeData",
        ready: vi.fn(),
      },
    });
  });

  it("should correctly initialize $initDataUnsafe and $initData", async () => {
    const scope = fork();
    await allSettled(telegramInitializeRequested, { scope });

    const initDataUnsafe = scope.getState($initDataUnsafe);
    const initData = scope.getState($initData);

    expect(initDataUnsafe).toEqual({ test: "unsafeData" });
    expect(initData).toBe("safeData");
  });

  it("should return null when Telegram.WebApp is not available", async () => {
    vi.stubGlobal("Telegram", undefined);

    const scope = fork();
    await allSettled(telegramInitializeRequested, { scope });

    const initDataUnsafe = scope.getState($initDataUnsafe);
    const initData = scope.getState($initData);

    expect(initDataUnsafe).toBeNull();
    expect(initData).toBeNull();
  });
});
