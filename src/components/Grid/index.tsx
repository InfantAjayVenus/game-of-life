import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { getRandomGame, runGame } from "./lib/GameOfLife";
import { GameProps } from "../../types/GameProps";
import { GameStats } from "../../types/GameRef";
import { RunningState } from "../../types/RunningState";
import Row from "./Row";

const ITERATION_TIME = 1000;



export default forwardRef(function ({ runningState, gridSize = 20, shouldAutoIterate, autoIterateFactor, updateGameStats }: GameProps, ref) {
    const [isDrawing, setIsDrawing] = useState(false);
    const [stateGrid, setStateGrid] = useState(new Array(gridSize).fill([]).map(_ => new Array(gridSize).fill(false)));
    const timerRef = useRef<number | undefined>();
    const previousRunningState = useRef<RunningState>(RunningState.STOPPED);
    const statsRef = useRef<Pick<GameStats, "currentPopulation" | "generation">>({ currentPopulation: 0, generation: 0 });

    useEffect(() => {
        setStateGrid(new Array(gridSize).fill([]).map(_ => new Array(gridSize).fill(false)));
    }, [gridSize]);

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


    const onIterate = () => {
        setStateGrid(currentGridState => {
            const updatedGridState = runGame(currentGridState);

            statsRef.current = {
                currentPopulation: updatedGridState.flat().filter(value => value).length,
                generation: statsRef.current?.generation + 1,
            };

            updateGameStats(statsRef.current.currentPopulation, statsRef.current.generation);
            if(statsRef.current.currentPopulation === 0) {
                onStop();
            }

            return updatedGridState;
        });


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
                setStateGrid(new Array(gridSize).fill([]).map(_ => new Array(gridSize).fill(false)));
                statsRef.current = { currentPopulation: 0, generation: 0 };
            },
            setRandomGame: () => {
                if (runningState === RunningState.STOPPED) {
                    setStateGrid(getRandomGame(gridSize));
                }
            },
        }
    }, [runningState, stateGrid]);
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
                            isEdit={runningState === RunningState.STOPPED}
                            isDraw={isDrawing}
                            values={row}
                            updateRow={(updatedRowValues) => {
                                const updatedGridState = [...stateGrid];
                                updatedGridState[index] = updatedRowValues;

                                setStateGrid(updatedGridState);
                            }}
                        />
                    )
                })}
            </div>
        </>
    )
})