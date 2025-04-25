import { create } from "zustand";

interface GameState {
  playersCount: number;
  selectedRoles: string[];
  shuffledRoles: string[];
  publicRoles: string[];
  currentPlayerIndex: number;
  setPlayersCount: (count: number) => void;
  setSelectedRoles: (roles: string[]) => void;
  shuffleRoles: () => void;
  nextPlayer: () => void;
  resetGame: () => void;
  reshuffleCurrentRole: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  playersCount: 0,
  selectedRoles: [],
  shuffledRoles: [],
  publicRoles: [],
  currentPlayerIndex: 0,

  setPlayersCount: (count) => set({ playersCount: count }),

  setSelectedRoles: (roles) => set({ selectedRoles: roles }),

  shuffleRoles: () => {
    const selected = [...get().selectedRoles];
    const players = get().playersCount;

    while (selected.length < players) {
      selected.push("Civilian");
    }

    for (let i = selected.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selected[i], selected[j]] = [selected[j], selected[i]];
    }

    set({ shuffledRoles: selected, currentPlayerIndex: 0 });
  },

  nextPlayer: () =>
    set((state) => ({
      currentPlayerIndex: state.currentPlayerIndex + 1,
    })),

  resetGame: () =>
    set({
      playersCount: 0,
      selectedRoles: [],
      shuffledRoles: [],
      publicRoles: [],
      currentPlayerIndex: 0,
    }),

  reshuffleCurrentRole: () => {
    const { shuffledRoles, currentPlayerIndex } = get();
    const remainingRoles = shuffledRoles.slice(currentPlayerIndex);

    if (remainingRoles.length <= 1) {
      alert("Нет других ролей для обмена!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * (remainingRoles.length - 1)) + 1;
    const newRoles = [...shuffledRoles];
    const temp = newRoles[currentPlayerIndex];
    newRoles[currentPlayerIndex] = newRoles[currentPlayerIndex + randomIndex];
    newRoles[currentPlayerIndex + randomIndex] = temp;

    set({ shuffledRoles: newRoles });
  },
}));
