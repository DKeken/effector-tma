import {
  $initData,
  $initDataUnsafe,
  $telegramWebApp,
} from "effector-telegram-mini-app";
import { useGate, useUnit } from "effector-react";
import { PageStartGate, $viewportChanged, $themeChanged } from "./model";

function App() {
  useGate(PageStartGate);

  const {
    telegramWebApp,
    initData,
    initDataUnsafe,
    viewportChanged,
    themeChanged,
  } = useUnit({
    telegramWebApp: $telegramWebApp,
    initData: $initData,
    initDataUnsafe: $initDataUnsafe,
    viewportChanged: $viewportChanged,
    themeChanged: $themeChanged,
  });

  console.log(viewportChanged, themeChanged);

  return (
    <div>
      {initDataUnsafe &&
        "user" in initDataUnsafe &&
        initDataUnsafe?.user.username}
    </div>
  );
}

export default App;
