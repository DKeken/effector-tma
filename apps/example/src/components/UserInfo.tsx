import { useUnit } from "effector-react";
import { $initDataUnsafe } from "effector-telegram-mini-app";

export function UserInfo() {
  const initDataUnsafe = useUnit($initDataUnsafe);

  return (
    <div>
      {initDataUnsafe &&
        "user" in initDataUnsafe &&
        initDataUnsafe?.user.username}
    </div>
  );
} 