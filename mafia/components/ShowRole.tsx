"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/game-store";
import { Typography, Button, Stack, Box, Fade } from "@mui/material";
import Image from "next/image";

// Важно: Ключи должны СТРОГО совпадать с тем, что генерирует стор (в верхнем регистре)
const roleImages: Record<string, string> = {
  "МИРНЫЙ ЖИТЕЛЬ": "/civilian.png",
  "МАФИЯ": "/mafia.png",
  "БОСС МАФИИ": "/bos_mafia.png",
  "КОМИССАР": "/kamisar.png",
  "ДОКТОР": "/doctor.png",
  "ВИРУС": "/desise.png"
};

export default function ShowRole() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const {
    shuffledRoles,
    currentPlayerIndex,
    playersCount,
    nextPlayer,
    publicRoles = []
  } = useGameStore();

  // Защита от пустого стора (например, при перезагрузке страницы)
  useEffect(() => {
    if (!shuffledRoles || shuffledRoles.length === 0) {
      router.push("/");
    }
  }, [shuffledRoles, router]);

  if (!shuffledRoles || shuffledRoles.length === 0) {
    return null;
  }

  const handleNext = () => {
    if (currentPlayerIndex + 1 >= playersCount) {
      router.push("/show-list");
      return;
    }

    // Анимация перехода
    setIsTransitioning(true);

    setTimeout(() => {
      nextPlayer();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 600);
  };

  const currentRoleRaw = shuffledRoles[currentPlayerIndex] || "";
  // Приводим к верхнему регистру для надежного поиска картинки
  const currentRole = currentRoleRaw.toUpperCase();
  const currentPublicRole = publicRoles[currentPlayerIndex];
  
  // Безопасное получение пути к картинке
  const currentRoleImage = roleImages[currentRole] || "/civilian.png";

  return (
    <Box sx={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100vw", 
      height: "100vh", 
      bgcolor: "black", 
      overflow: "hidden" 
    }}>
      
      <Fade in={!isTransitioning} timeout={600}>
        <Box sx={{ width: "100%", height: "100%" }}>
          
          {/* Фоновое изображение */}
          <Box sx={{ position: "absolute", inset: 0 }}>
            <Image
              src={currentRoleImage}
              alt={currentRole}
              fill
              priority
              style={{ objectFit: "cover" }}
            />
            {/* Градиент для затемнения нижней части и краев */}
            <Box sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)",
            }} />
          </Box>

          <Stack 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{ position: "relative", zIndex: 2, height: "100%", pt: 6, pb: 8, px: 4 }}
          >
            {/* Верхний счетчик */}
            <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.5)", letterSpacing: 3, fontWeight: 500 }}>
              ИГРОК {currentPlayerIndex + 1} ИЗ {playersCount}
            </Typography>

            {/* Нижний блок: Название роли и Кнопка */}
            <Stack spacing={3} sx={{ width: "100%", alignItems: "center" }}>
              
              <Box sx={{ textAlign: "center", width: "100%" }}>
                <Box
                  sx={{
                    display: "inline-block",
                    border: "1px solid rgba(255,255,255,0.25)",
                    backdropFilter: "blur(4px)",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    px: 6,
                    py: 2.5,
                    borderRadius: 4, // Скругленные углы
                    boxShadow: "0 10px 40px rgba(0,0,0,0.6)"
                  }}
                >
                  <Typography variant="h4" sx={{ color: "white", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>
                    {currentRole}
                  </Typography>
                </Box>
                
                {currentPublicRole && (
                  <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", mt: 2, fontWeight: 300, fontStyle: "italic" }}>
                     — {currentPublicRole} —
                  </Typography>
                )}
              </Box>

              <Button
                variant="contained"
                disabled={isTransitioning}
                sx={{ 
                  width: "100%", 
                  maxWidth: 340, 
                  bgcolor: "rgba(255,255,255,0.95)", 
                  color: "black",
                  borderRadius: 3, // Скругленная кнопка
                  py: 2, 
                  fontSize: "1.1rem", 
                  fontWeight: "bold",
                  transition: "all 0.2s ease",
                  "&:hover": { bgcolor: "white", transform: "scale(1.02)" },
                  "&.Mui-disabled": { bgcolor: "rgba(255,255,255,0.3)" }
                }}
                onClick={handleNext}
              >
                {currentPlayerIndex + 1 === playersCount ? "ПОСМОТРЕТЬ СПИСОК" : "СЛЕДУЮЩИЙ ИГРОК"}
              </Button>
            </Stack>

          </Stack>
        </Box>
      </Fade>
    </Box>
  );
}