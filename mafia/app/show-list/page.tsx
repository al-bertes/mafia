"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/game-store";
import { Typography, Button, Stack, Box, Divider, Grow } from "@mui/material";
import Image from "next/image";

const roleImages: Record<string, string> = {
  "😇 Civilian": "/civilian.jpeg",
  "🕶️ Mafia": "/mafia.jpg",
  "🎩 Boss Mafia": "/bos_mafia.jpeg",
  "👮‍♂️ Commissar": "/kamsar.jpeg",
  "🩺 Doctor": "/doctor.avif",
  "🤢 Virus": "/desise.jpg"
};

export default function RolesListPage() {
  const router = useRouter();
  const { shuffledRoles, publicRoles, resetGame } = useGameStore();

  if (!shuffledRoles.length) {
    router.push("/");
    return null;
  }

  const handleRestart = () => {
    resetGame();
    router.push("/");
  };

  return (
    <Stack spacing={3} alignItems="center" sx={{ mt: 4, px: 2, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold">
        🎭 Full Role List
      </Typography>

      {shuffledRoles.map((role, index) => (
        <Grow in timeout={300 + index * 50} key={index}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              backgroundColor: "#fafafa",
              width: "100%"
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h6" sx={{ minWidth: 100 }}>
                Player {index + 1}:
              </Typography>
              {roleImages[role] && (
                <Box sx={{ position: "relative", width: 50, height: 50 }}>
                  <Image
                    src={roleImages[role]}
                    alt={role}
                    fill
                    style={{ objectFit: "cover", borderRadius: "6px" }}
                  />
                </Box>
              )}
              <Box>
                <Typography variant="h6">{role}</Typography>
                {publicRoles?.[index] && (
                  <Typography variant="body2" color="text.secondary">
                    🧑‍🎤 {publicRoles[index]}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Box>
        </Grow>
      ))}

      <Divider sx={{ width: "100%", my: 2 }} />

      <Button
        variant="contained"
        color="secondary"
        sx={{ px: 4, py: 1.5, fontSize: "1.1rem", fontWeight: "bold" }}
        onClick={handleRestart}
      >
        🔁 Start New Game
      </Button>
    </Stack>
  );
}
