"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/game-store";
import { Button } from "@mui/material";

interface StartGameButtonProps {
  count: number;
  selectedRoles: { [role: string]: number };
}

export default function StartGameButton({ count, selectedRoles }: StartGameButtonProps) {
  const router = useRouter();
  // Добавляем setSelectedRoles из стора
  const { setPlayersCount, setSelectedRoles, shuffleRoles } = useGameStore();

  const startGame = () => {
    // 1. Считаем общее количество спец. ролей
    const specialRolesCount = Object.values(selectedRoles).reduce((a, b) => a + b, 0);

    // 2. Валидация
    if (specialRolesCount > count) {
      alert(`Вы выбрали ${specialRolesCount} ролей, но указали ${count} игроков. Уменьшите количество ролей.`);
      return;
    }

    if (count < 3) { // Исправил текст алерта, раз ты проверяешь на 3
      alert(`Минимум 3 игрока.`);
      return;
    }

    // 3. ПЕРЕДАЕМ ВЫБРАННЫЕ РОЛИ В СТОР (Это самое важное!)
    setSelectedRoles(selectedRoles);
    
    // 4. Устанавливаем количество игроков
    setPlayersCount(count);

    // 5. Запускаем перемешивание (теперь оно увидит роли в сторе)
    shuffleRoles();

    // 6. Переходим на страницу раздачи
    router.push("/show-role");
  };

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      size="large"
      sx={{ 
        mt: 3, 
        py: 1.5, 
        fontWeight: "bold", 
        borderRadius: 2,
        fontSize: "1.1rem" 
      }}
      onClick={startGame}
    >
      Начать игру
    </Button>
  );
}