export function generateDefaultRoles(totalPlayers: number): { [role: string]: number } {
  const roles: { [role: string]: number } = {
    "БОСС МАФИИ": 1,
    "КОМИССАР": 1,
    "ДОКТОР": 1,
    "ВИРУС": 1,
  };

  const mafiaTarget = Math.round(totalPlayers * 0.25);
  // Вычитаем 1 (Босса), чтобы получить количество обычной мафии
  const mafiaCount = Math.max(mafiaTarget - 1, 0); 

  if (mafiaCount > 0) {
    roles["МАФИЯ"] = mafiaCount;
  }

  const assigned = Object.values(roles).reduce((a, b) => a + b, 0);
  const civilians = Math.max(totalPlayers - assigned, 0);

  if (civilians > 0) {
    // ВАЖНО: убедитесь, что здесь "МИРНЫЙ ЖИТЕЛЬ", 
    // если в RoleSelection вы используете это же название
    roles["МИРНЫЙ"] = civilians; 
  }

  return roles;
}