import { create } from "zustand";

// Используем единую константу для мирного жителя
const CIVILIAN_LABEL = "МИРНЫЙ ЖИТЕЛЬ";

interface GameState {
  playersCount: number;
  selectedRoles: { [role: string]: number }; // Объект с количеством ролей
  shuffledRoles: string[]; // Итоговый перемешанный массив
  publicRoles: string[];   // Добавили для поддержки компонента ShowRole
  currentPlayerIndex: number;
  // Методы
  setPlayersCount: (count: number) => void;
  setSelectedRoles: (roles: { [role: string]: number }) => void;
  shuffleRoles: () => void;
  nextPlayer: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  playersCount: 0,
  selectedRoles: {},
  shuffledRoles: [],
  publicRoles: [], // Инициализируем пустым массивом
  currentPlayerIndex: 0,

  setPlayersCount: (count) => set({ playersCount: count }),

  setSelectedRoles: (roles) => set({ selectedRoles: roles }),

  // Основная логика генерации и перемешивания колоды
  shuffleRoles: () => {
    const { selectedRoles, playersCount } = get();
    
    // 1. Создаем массив на основе выбранных ролей
    const fullDeck: string[] = [];
    
    Object.entries(selectedRoles).forEach(([roleName, count]) => {
      for (let i = 0; i < count; i++) {
        // Добавляем роль в верхнем регистре для совпадения с ключами картинок
        fullDeck.push(roleName.toUpperCase());
      }
    });

    // 2. Добиваем оставшиеся места мирными жителями
    while (fullDeck.length < playersCount) {
      fullDeck.push(CIVILIAN_LABEL);
    }

    // 3. Алгоритм Фишера-Йетса (самый честный рандом)
    for (let i = fullDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [fullDeck[i], fullDeck[j]] = [fullDeck[j], fullDeck[i]];
    }

    // Сохраняем результат, сбрасываем индекс и очищаем публичные роли (если были)
    set({ 
      shuffledRoles: fullDeck, 
      publicRoles: [], 
      currentPlayerIndex: 0 
    });
  },

  nextPlayer: () =>
    set((state) => ({
      currentPlayerIndex: state.currentPlayerIndex + 1,
    })),

  resetGame: () =>
    set({
      playersCount: 0,
      selectedRoles: {},
      shuffledRoles: [],
      publicRoles: [],
      currentPlayerIndex: 0,
    }),
}));