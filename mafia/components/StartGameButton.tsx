"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/game-store";
import { Button } from "@mui/material";

interface StartGameButtonProps {
  count: number;
  selectedRoles: { [role: string]: number };
}

const civilianRoleName = "Civilian";

export default function StartGameButton({ count, selectedRoles }: StartGameButtonProps) {
  const router = useRouter();
  const { setPlayersCount, setSelectedRoles, shuffleRoles } = useGameStore();

  const startGame = () => {
    const rolesArray = Object.entries(selectedRoles)
      .flatMap(([role, qty]) => Array(qty).fill(role));

    const specialRolesCount = rolesArray.length;

    if (specialRolesCount > count) {
      alert(`You selected ${specialRolesCount} roles, but specified ${count} players. Please reduce the number of roles.`);
      return;
    }

    if (count < 3) {
      alert(`There must be at least 6 players.`);
      return;
    }

    const missing = count - specialRolesCount;
    const finalRolesArray = [...rolesArray, ...Array(missing).fill(civilianRoleName)];

    setPlayersCount(finalRolesArray.length);
    setSelectedRoles(finalRolesArray);
    shuffleRoles();
    router.push("/show-role");
  };

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{ mt: 3 }}
      onClick={startGame}
    >
      Start the game
    </Button>
  );
}
