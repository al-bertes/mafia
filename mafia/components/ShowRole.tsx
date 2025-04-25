
"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/game-store";
import { Typography, Button, Stack, Box, Tooltip, Fade, Divider } from "@mui/material";
import Image from "next/image";
const roleImages: Record<string, string> = {
  "😇 Civilian": "/civilian.jpeg",
  "🕶️ Mafia": "/mafia.jpg",
  "🎩 Boss Mafia": "/bos_mafia.jpeg",
  "👮‍♂️ Commissar": "/kamsar.jpeg",
  "🩺 Doctor": "/doctor.avif",
  "🤢 Virus": "/desise.jpg"
};

export default function ShowRole() {
  const router = useRouter();
  const {
    shuffledRoles,
    currentPlayerIndex,
    playersCount,
    nextPlayer,
    reshuffleCurrentRole,
    publicRoles
  } = useGameStore();

  const handleNext = () => {
    if (currentPlayerIndex + 1 >= playersCount) {
      router.push("/show-list");
    } else {
      nextPlayer();
    }
  };

  if (!shuffledRoles.length) {
    router.push("/");
    return null;
  }

  const currentRole = shuffledRoles[currentPlayerIndex];
  const currentPublicRole = publicRoles?.[currentPlayerIndex];

  const currentRoleImage = roleImages[currentRole];

  return (
    <Stack spacing={3} alignItems="center" sx={{ mt: 6, px: 3 }}>
      <Tooltip
        title="Shuffel"
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 400 }}
      >
        <Box
          onClick={reshuffleCurrentRole}
          sx={{
            cursor: "pointer",
            borderRadius: 2,
            backgroundColor: "#f5f5f5",
            px: 3,
            py: 1,
            boxShadow: 1,
            transition: "all 0.2s ease",
            '&:hover': { backgroundColor: "#e0e0e0", transform: "scale(1.03)" }
          }}
        >
          <Typography variant="h5" align="center">
            Role {currentPlayerIndex + 1}
          </Typography>
        </Box>
      </Tooltip>

      {currentRoleImage && (
        <Box sx={{ position: "relative", width: 220, height: 220, borderRadius: "9%", overflow: "hidden", boxShadow: 3 }}>
          <Image
            src={currentRoleImage}
            alt={currentRole}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
      )}

      <Typography variant="h3" align="center" sx={{ fontWeight: "bold" }}>
        {currentRole}
      </Typography>
      {currentPublicRole && (
  <Typography variant="h6" align="center" color="text.secondary">
    🧑‍🎤 {currentPublicRole}
  </Typography>
)}
      <Divider sx={{ width: "100%", my: 2 }} />

      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ width: "100%", py: 1.5, fontSize: "1.1rem", fontWeight: "bold" }}
        onClick={handleNext}
      >
        Next
      </Button>
    </Stack>
  );
}