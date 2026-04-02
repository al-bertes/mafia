"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/game-store";
import { Typography, Button, Stack, Box, Divider, Grow, Avatar } from "@mui/material";

// Сверяем ключи с теми, что приходят из стора (UPPERCASE)
const roleImages: Record<string, string> = {
  "МИРНЫЙ ЖИТЕЛЬ": "/civilian.jpeg",
  "МАФИЯ": "/mafia.jpg",
  "БОСС МАФИИ": "/bos_mafia.jpeg",
  "КОМИССАР": "/kamisar.jpeg",
  "ДОКТОР": "/doctor.avif",
  "ВИРУС": "/desise.jpg"
};

// Функция для определения цвета рамки в зависимости от роли
const getRoleColor = (role: string) => {
  if (role.includes("МАФИЯ")) return "#ef5350"; // Красный
  if (role.includes("КОМИССАР") || role.includes("ДОКТОР")) return "#4fc3f7"; // Голубой
  if (role.includes("ВИРУС")) return "#66bb6a"; // Зеленый
  return "rgba(255,255,255,0.3)"; // Серый для мирных
};

export default function RolesListPage() {
  const router = useRouter();
  const { shuffledRoles, publicRoles, resetGame } = useGameStore();

  if (!shuffledRoles || !shuffledRoles.length) {
    router.push("/");
    return null;
  }

  const handleRestart = () => {
    resetGame();
    router.push("/");
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      bgcolor: "#0a0a0a", // Глубокий черный фон
      color: "white",
      py: 6, px: 2 
    }}>
      <Stack spacing={3} alignItems="center" sx={{ maxWidth: 500, mx: "auto" }}>
        
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, letterSpacing: -1 }}>
          ИТОГИ РОЛЕЙ
        </Typography>

        <Stack spacing={1.5} sx={{ width: "100%" }}>
          {shuffledRoles.map((role, index) => {
            const roleKey = role.toUpperCase();
            const color = getRoleColor(roleKey);

            return (
              <Grow in timeout={400 + index * 100} key={index}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderLeft: `4px solid ${color}`,
                    backdropFilter: "blur(10px)",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateX(8px)", bgcolor: "rgba(255, 255, 255, 0.08)" }
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    {/* Номер игрока в кружочке */}
                    <Avatar sx={{ 
                      width: 32, height: 32, 
                      bgcolor: "transparent", 
                      border: "1px solid rgba(255,255,255,0.2)",
                      fontSize: "0.9rem" 
                    }}>
                      {index + 1}
                    </Avatar>

                    {/* Мини-превью картинки роли */}
                    <Avatar 
                      src={roleImages[roleKey]} 
                      variant="rounded"
                      sx={{ width: 45, height: 45, boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}
                    />

                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold", lineHeight: 1.2 }}>
                        {role}
                      </Typography>
                      {publicRoles?.[index] && (
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
                          ID: {publicRoles[index]}
                        </Typography>
                      )}
                    </Box>
                  </Stack>

                  {/* Иконка статуса (опционально) */}
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color, boxShadow: `0 0 10px ${color}` }} />
                </Box>
              </Grow>
            );
          })}
        </Stack>

        <Divider sx={{ width: "100%", borderColor: "rgba(255,255,255,0.1)", my: 2 }} />

        <Button
          variant="outlined"
          fullWidth
          onClick={handleRestart}
          sx={{ 
            py: 2, 
            borderRadius: 3, 
            color: "white", 
            borderColor: "rgba(255,255,255,0.3)",
            fontSize: "1rem",
            fontWeight: "bold",
            "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.05)" }
          }}
        >
          НОВАЯ ИГРА
        </Button>
      </Stack>
    </Box>
  );
}