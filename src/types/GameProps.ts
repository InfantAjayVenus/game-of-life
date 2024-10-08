import { RunningState } from "./RunningState";

export interface GameProps {
    runningState: RunningState,
    gridSize?: number,
    shouldAutoIterate: boolean,
    autoIterateFactor: number,
    updateGameStats: (currentPopulation: number, generation: number) => void
}