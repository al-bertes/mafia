export function generateDefaultRoles(totalPlayers: number): { [role: string]: number } {
  const roles: { [role: string]: number } = {
    "🎩 Boss Mafia": 1,
    "👮‍♂️ Commissar": 1,
    "🩺 Doctor": 1,
    "🤢 Virus": 1,
  };


  const mafiaTarget = Math.round(totalPlayers * 0.25);
  const mafiaCount = Math.max(mafiaTarget - 1, 0); // кроме босса

  if (mafiaCount > 0) {
    roles["🕶️ Mafia"] = mafiaCount;
  }

  const assigned = Object.values(roles).reduce((a, b) => a + b, 0);
  const civilians = Math.max(totalPlayers - assigned, 0);

  if (civilians > 0) {
    roles["😇 Civilian"] = civilians;
  }

  return roles;
}
