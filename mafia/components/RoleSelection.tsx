"use client";

import { Stack, Typography, IconButton, Box, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useMemo } from "react";

interface RoleSelectionProps {
  selectedRoles: { [role: string]: number };
  setSelectedRoles: (updater: (prev: { [role: string]: number }) => { [role: string]: number }) => void;
  totalPlayers: number;
}

const allRoles = ["🕶️ Mafia", "🎩 Boss Mafia", "👮‍♂️ Commissar", "🩺 Doctor", "🤢 Virus"];
const civilianRoleName = "😇 Civilian";

export default function RoleSelection({ selectedRoles, setSelectedRoles, totalPlayers }: RoleSelectionProps) {
  const updateRoleCount = (role: string, delta: number) => {
    setSelectedRoles((prev) => {
      const current = prev[role] || 0;
      const newCount = current + delta;
      if (newCount < 0) return prev;
      return {
        ...prev,
        [role]: newCount,
      };
    });
  };

  const { specialRolesCount, civilianCount } = useMemo(() => {
    const special = allRoles.reduce((sum, role) => sum + (selectedRoles[role] || 0), 0);
    const civilian = Math.max(totalPlayers - special, 0);
    return { specialRolesCount: special, civilianCount: civilian };
  }, [selectedRoles, totalPlayers]);

  const isOverfilled = totalPlayers > 0 && specialRolesCount > totalPlayers;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Role Distribution
      </Typography>

      {isOverfilled && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          Too many selected roles! Please reduce the number.
        </Typography>
      )}

      <Stack spacing={2}>
        {allRoles.map((role) => (
          <Paper
            key={role}
            elevation={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1,
              borderRadius: 2,
              backgroundColor: "#fafafa",
            }}
          >
            <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>{role}</Typography>
            <IconButton onClick={() => updateRoleCount(role, -1)}>
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ width: 30, textAlign: "center", fontWeight: "bold" }}>
              {selectedRoles[role] || 0}
            </Typography>
            <IconButton onClick={() => updateRoleCount(role, 1)}>
              <AddIcon />
            </IconButton>
          </Paper>
        ))}

        {/* Civilians */}
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1,
            borderRadius: 2,
            backgroundColor: "#f0f0f0",
          }}
        >
          <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>{civilianRoleName}</Typography>
          <Box sx={{ width: 40 }} />
          <Typography sx={{ width: 30, textAlign: "center", fontWeight: "bold" }}>{civilianCount}</Typography>
          <Box sx={{ width: 40 }} />
        </Paper>
      </Stack>
    </>
  );
}
