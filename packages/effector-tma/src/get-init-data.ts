import { $telegramWebApp } from "./telegram-instance";
import { reshape } from "patronum/reshape";

export const { $initDataUnsafe, $initData } = reshape({
  source: $telegramWebApp,
  shape: {
    $initDataUnsafe: (webApp) => webApp?.WebApp.initDataUnsafe ?? null,
    $initData: (webApp) => webApp?.WebApp.initData ?? null,
  },
});
