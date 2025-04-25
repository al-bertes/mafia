"use client";

import { Typography, Box, Stack, Divider } from "@mui/material";
import LayoutWrapper from "@/components/LayoutWrapper";

export default function RulesPage() {
  return (
    <LayoutWrapper>
      <Stack spacing={4} sx={{ mt: 4, px: 2, maxWidth: 800, mx: "auto" }}>
        <Typography variant="h3" fontWeight="bold" textAlign="center">
          🎯 Game Rules
        </Typography>

        <Typography variant="body1">
          Mafia is a social deduction party game. Players are divided into two groups: the Mafia and the Peaceful Citizens. The goal of the Mafia is to eliminate all others, while the Citizens must expose and eliminate the Mafia.
        </Typography>

        <Divider />

        <Typography variant="h5" fontWeight="bold">🧑‍🤝‍🧑 Roles</Typography>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold">🕶️ Mafia</Typography>
          <Typography variant="body2">
            Acts at night to choose one player to eliminate. Mafia members know each other but not the Boss.
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold">🎩 Boss Mafia</Typography>
          <Typography variant="body2">
            A powerful member of the Mafia with a deciding vote. Can override other Mafia choices.
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold">🩺 Doctor</Typography>
          <Typography variant="body2">
            Can heal one player each night. If they heal the person targeted by Mafia, that player survives. Can heal themselves only once.
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold">👮‍♂️ Commissar</Typography>
          <Typography variant="body2">
            Investigates one player each night and learns whether they are Mafia or not. Must be strategic when sharing information.
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold">🤢 Virus</Typography>
          <Typography variant="body2">
            Infects a player each night. The infected player dies the next night unless healed by the Doctor. Virus plays solo and wins if they are the last standing.
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold">😇 Civilian</Typography>
          <Typography variant="body2">
            No special powers. Must rely on deduction and discussion during the day.
          </Typography>
        </Box>

        <Divider />

        <Typography variant="h5" fontWeight="bold">⏱️ Game Flow</Typography>
        <Typography variant="body2">
          1. <strong>Night:</strong> Mafia votes, Boss may override, Doctor heals, Commissar checks, Virus infects.<br/>
          2. <strong>Morning:</strong> Reveal who was killed or saved.<br/>
          3. <strong>Day:</strong> Players discuss and debate.<br/>
          4. <strong>Voting:</strong> One player is eliminated by group vote.
        </Typography>

        <Divider />

        <Typography variant="h5" fontWeight="bold">🏆 Win Conditions</Typography>
        <Typography variant="body2">
          - <strong>Civilians win</strong> when all Mafia and Virus are eliminated.<br/>
          - <strong>Mafia wins</strong> when their number equals or exceeds the rest.<br/>
          - <strong>Virus wins</strong> if they are the last player remaining.
        </Typography>
      </Stack>
    </LayoutWrapper>
  );
}