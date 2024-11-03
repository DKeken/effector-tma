import { useGate, useUnit } from "effector-react";
import { PageStartGate, $viewportChanged, $themeChanged } from "./model";
import { InputForm } from "./components/InputForm";
import { UserInfo } from "./components/UserInfo";
import { HapticFeedback } from "./components/HapticFeedback";

function App() {
  useGate(PageStartGate);

  const { viewportChanged, themeChanged } = useUnit({
    viewportChanged: $viewportChanged,
    themeChanged: $themeChanged,
  });

  return (
    <div>
      <HapticFeedback />
      <InputForm />
      <UserInfo />
    </div>
  );
}

export default App;
