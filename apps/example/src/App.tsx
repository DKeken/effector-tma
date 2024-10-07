import { $initData, $initDataUnsafe, $telegramWebApp } from "effector-tma";
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

  return <div>{initDataUnsafe?.user.username}</div>;
}

export default App;
