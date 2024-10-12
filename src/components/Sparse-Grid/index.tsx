import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { getRandomGame, runGame } from "./lib/GameOfLife";
import { GameProps } from "../../types/GameProps";
import { GameStats } from "../../types/GameRef";
import { RunningState } from "../../types/RunningState";
import Row from "./Row";
import { SparsePoint } from "../../types/SparsePoints";

const ITERATION_TIME = 1000;



export default forwardRef(function ({ runningState, gridSize = 20, shouldAutoIterate, autoIterateFactor, updateGameStats }: GameProps, ref) {
    const [isDrawing, setIsDrawing] = useState(false);
    const [sparseGrid, setSparseGrid] = useState<SparsePoint[]>([]);
    const timerRef = useRef<number | undefined>();
    const previousRunningState = useRef<RunningState>(RunningState.STOPPED);
    const statsRef = useRef<Pick<GameStats, "currentPopulation" | "generation">>({ currentPopulation: 0, generation: 0 });
    const transformPoints = {
        x: parseInt((gridSize / 2).toString()),
        y: parseInt((gridSize / 2).toString())
    }


    const stateGrid = sparseGrid.reduce((grid, coOrd) => {
        const transformedCoOrd = { x: coOrd.x + transformPoints.x, y: coOrd.y + transformPoints.y };
        if (transformedCoOrd.x >= gridSize || transformedCoOrd.x < 0 || transformedCoOrd.y < 0 || transformedCoOrd.y >= gridSize) return grid;

        grid[transformedCoOrd.x][transformedCoOrd.y] = true;
        return grid;
    }, new Array(gridSize).fill([]).map(_ => new Array(gridSize).fill(false)));

    useEffect(() => {
        if (runningState === RunningState.RUNNING) {
            if (previousRunningState.current === RunningState.PAUSED) {
                setIsDrawing(false);
            } else {
                statsRef.current = { currentPopulation: 0, generation: 0 };
            }
            onIterate();
        } else if (runningState === RunningState.PAUSED) {
            clearTimeout(timerRef.current);
        } else if (runningState === RunningState.STOPPED) {
            onStop();
        }
    }, [runningState])

    const onUpdateGameState = (stateUpdateFunction: (currentSparseGrid: SparsePoint[]) => SparsePoint[]) => {
        setSparseGrid(currentSparseGrid => {
            const updatedGridState: SparsePoint[] = stateUpdateFunction(currentSparseGrid);

            statsRef.current = {
                currentPopulation: updatedGridState.flat().filter(value => value).length,
                generation: statsRef.current?.generation + 1,
            };

            updateGameStats(statsRef.current.currentPopulation, statsRef.current.generation);
            if (statsRef.current.currentPopulation === 0) {
                onStop();
            }

            return updatedGridState;
        });

    }

    const onIterate = () => {
        onUpdateGameState(runGame)

        if (shouldAutoIterate) {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                onIterate();
            }, ITERATION_TIME / autoIterateFactor)
        }
    };

    const onStop = () => {
        setIsDrawing(false);
        clearTimeout(timerRef.current);
    };

    useImperativeHandle(ref, () => {
        return {
            iterate: onIterate,
            reset: () => {
                setSparseGrid([]);
                statsRef.current = { currentPopulation: 0, generation: 0 };
            },
            setRandomGame: () => {
                if (runningState === RunningState.STOPPED) {
                    onUpdateGameState(() => getRandomGame(gridSize, transformPoints))
                }
            },
        }
    }, [runningState, sparseGrid]);
    return (
        <>
            <div
                className="p-1 w-[min(100vw,100vh)] h-[min(100vw,100vh)] max-h-[100vh] grid grid-flow-row"
                onMouseDown={() => {
                    setIsDrawing(true);
                }}
                onMouseUp={() => {
                    setIsDrawing(false);
                }}
            >
                {stateGrid.map((row, index) => {
                    return (
                        <Row
                            key={`row-${index}`}
                            isEdit={runningState === RunningState.STOPPED}
                            isDraw={isDrawing}
                            values={row}
                            updateRow={(colIndex: number) => {
                                const cellPoint: SparsePoint = { x: index - transformPoints.x, y: colIndex - transformPoints.y };
                                const cellIndex = sparseGrid.findIndex(coOrd => coOrd.x === cellPoint.x && coOrd.y === cellPoint.y);
                                const updatedSparseGrid = [...sparseGrid]

                                if (cellIndex < 0) {
                                    updatedSparseGrid.push(cellPoint);
                                } else {
                                    updatedSparseGrid.splice(cellIndex, 1);
                                }
                                setSparseGrid(updatedSparseGrid);
                            }}
                        />
                    )
                })}
            </div>
        </>
    )
})