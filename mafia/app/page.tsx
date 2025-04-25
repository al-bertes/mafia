"use client";

import LayoutWrapper from "@/components/LayoutWrapper";
import PlayerCountInput from "@/components/PlayerCountInput";
import RoleSelection from "@/components/RoleSelection";
import StartGameButton from "@/components/StartGameButton";
import { generateDefaultRoles } from "@/utils/generateDefaultRoles";
import Link from "next/link";
import { Button } from "@mui/material";
import { useGameStore } from "@/store/game-store";
import { useState, useEffect } from "react";
import { Typography, Stack } from "@mui/material";

export default function HomePage() {
  const { resetGame } = useGameStore();
  const [count, setCount] = useState(10);
  const [selectedRoles, setSelectedRoles] = useState<{ [role: string]: number }>({});

  useEffect(() => {
    resetGame();
    const defaultRoles = generateDefaultRoles(count);
    setSelectedRoles(() => defaultRoles);
  }, [resetGame, count]);

  return (
    <LayoutWrapper >
<Stack spacing={1} alignItems="center" sx={{ mt: 4, mb: 2 }}>
  <Typography
    variant="h2"
    sx={{
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 2,
      mb: 1,
    }}
  >
    🎭 Mafia 🎭
  </Typography>
  <Typography variant="subtitle1" sx={{ color: "gray" }}>
    A social deduction party game
  </Typography>

  <Link href="/rules-page" passHref>
    <Button
      variant="outlined"
      color="secondary"
      size="small"
      sx={{ mt: 1, fontWeight: 500 }}
    >
      📘 Read the Rules
    </Button>
  </Link>
</Stack>


      <PlayerCountInput count={count} setCount={setCount} />

      <RoleSelection
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        totalPlayers={count}
      />

      <StartGameButton count={count} selectedRoles={selectedRoles} />
    </LayoutWrapper>
  );
}
