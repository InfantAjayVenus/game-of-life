export interface GameRef {
    iterate: () => void,
    reset: () => void,
    setRandomGame: () => void,
    stats: GameStats,
}

export interface GameStats {
    currentPopulation: number,
    totalPopulation: number,
    generation: number,
} 