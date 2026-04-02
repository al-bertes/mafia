"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/game-store";
import { Typography, Button, Stack, Box, Fade } from "@mui/material";
import Image from "next/image";

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
  
  // Состояние для управления анимацией Fade
  const [isVisible, setIsVisible] = useState(true);
  
  const {
    shuffledRoles,
    currentPlayerIndex,
    playersCount,
    nextPlayer,
    publicRoles = []
  } = useGameStore();

  useEffect(() => {
    if (!shuffledRoles || shuffledRoles.length === 0) {
      router.push("/");
    }
  }, [shuffledRoles, router]);

  if (!shuffledRoles || shuffledRoles.length === 0) return null;

  const handleNext = () => {
    if (currentPlayerIndex + 1 >= playersCount) {
      router.push("/show-list");
      return;
    }

    // 1. Начинаем исчезновение (Fade Out)
    setIsVisible(false);

    // 2. Ждем, пока экран станет полностью черным (600ms - стандарт тайм-аута Fade)
    setTimeout(() => {
      // 3. Меняем данные в сторе, пока нас не видно
      nextPlayer();
      
      // 4. Начинаем появление (Fade In) уже с новыми данными и новой картинкой
      setTimeout(() => {
        setIsVisible(true);
      }, 100); 
    }, 600);
  };

  const currentRoleRaw = shuffledRoles[currentPlayerIndex] || "";
  const currentRole = currentRoleRaw.toUpperCase();
  const currentPublicRole = publicRoles[currentPlayerIndex];
  const currentRoleImage = roleImages[currentRole] || "/civilian.png";

  return (
    <Box sx={{ 
      position: "fixed", 
      inset: 0, 
      bgcolor: "black", 
      overflow: "hidden",
      width: "100vw",
      height: "100vh" 
    }}>
      
      {/* Фрейм под картинку: она всегда на заднем плане и не меняет размер */}
      <Box sx={{ 
        position: "absolute", 
        inset: 0, 
        zIndex: 1,
        width: "100%",
        height: "100%"
      }}>
        <Fade in={isVisible} timeout={600}>
          <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
            <Image
              src={currentRoleImage}
              alt={currentRole}
              fill
              priority // Заставляет браузер грузить картинку быстрее
              quality={90}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            {/* Усиленный виньеточный градиент для атмосферы */}
            <Box sx={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle, rgba(0,0,0,0) 20%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.9) 100%), linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)",
            }} />
          </Box>
        </Fade>
      </Box>

      {/* Контентная часть */}
      <Fade in={isVisible} timeout={600}>
        <Stack 
          justifyContent="space-between" 
          alignItems="center" 
          sx={{ 
            position: "relative", 
            zIndex: 2, 
            height: "100%", 
            pt: 6, 
            pb: 8, 
            px: 4 
          }}
        >
          <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.6)", letterSpacing: 4, fontWeight: 600 }}>
            ИГРОК {currentPlayerIndex + 1} ИЗ {playersCount}
          </Typography>

          <Stack spacing={4} sx={{ width: "100%", alignItems: "center" }}>
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <Box
                sx={{
                  display: "inline-block",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  px: 5,
                  py: 3,
                  borderRadius: 6,
                  boxShadow: "0 20px 50px rgba(0,0,0,0.8)"
                }}
              >
                <Typography variant="h3" sx={{ color: "white", fontWeight: 900, textTransform: "uppercase", letterSpacing: 2 }}>
                  {currentRole}
                </Typography>
              </Box>
              
              {currentPublicRole && (
                <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.7)", mt: 2, fontWeight: 300 }}>
                   {currentPublicRole}
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              disabled={!isVisible} // Отключаем кнопку во время анимации
              sx={{ 
                width: "100%", 
                maxWidth: 360, 
                bgcolor: "white", 
                color: "black",
                borderRadius: 4,
                py: 2.2, 
                fontSize: "1.1rem", 
                fontWeight: "900",
                letterSpacing: 1,
                boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
                transition: "all 0.3s ease",
                "&:hover": { bgcolor: "#f0f0f0", transform: "translateY(-2px)" },
                "&.Mui-disabled": { bgcolor: "rgba(255,255,255,0.2)" }
              }}
              onClick={handleNext}
            >
              {currentPlayerIndex + 1 === playersCount ? "ПОСМОТРЕТЬ ИТОГИ" : "ДАЛЕЕ"}
            </Button>
          </Stack>
        </Stack>
      </Fade>
    </Box>
  );
}