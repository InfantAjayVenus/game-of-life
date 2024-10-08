import { useRef, useState } from "react";
import { Slider } from "./@/components/ui/slider";
import Button from "./components/Button";
import Grid from "./components/Grid";
import { GameRef, GameStats } from "./types/GameRef";
import { RunningState } from "./types/RunningState";
import { Switch } from "./@/components/ui/switch";

export default function App() {
  const gameRef = useRef<GameRef>();
  const [shouldAutoIterate, setShouldAutoIterate] = useState(true);
  const [gridSize, setGridSize] = useState(35);
  const [runningState, setRunningState] = useState<RunningState>(RunningState.STOPPED);
  const [gameStats, setGameStats] = useState<GameStats>({ currentPopulation: 0, totalPopulation: 0, generation: 0 });

  const [autoRunFactor, setAutoRunFactor] = useState(2);

  const updateGameStats = (currentPopulation: number, generation: number) => {
    setGameStats(currentGameStats => ({
      currentPopulation,
      totalPopulation: generation === 1 ? currentPopulation : currentGameStats.totalPopulation + currentPopulation,
      generation
    }))
  }

  const isEdit = runningState === RunningState.STOPPED;
  const { currentPopulation = 0, totalPopulation = 0, generation = 0 } = gameStats;
  return (
    <>
      <div className="flex flex-col justify-between h-screen overflow-y-hidden lg:flex-row-reverse lg:justify-around">
        <Grid
          ref={gameRef}
          gridSize={gridSize}
          autoIterateFactor={autoRunFactor}
          shouldAutoIterate={shouldAutoIterate}
          runningState={runningState}
          updateGameStats={updateGameStats}
        />
        <div className="flex flex-col lg:h-full lg:justify-center xl:w-1/3">
          <div className="flex flex-col items-start border border-black m-4 p-4 rounded-lg">
              <p>Generation: {generation}</p>
              <p>Current Populatation: {currentPopulation}</p>
              <p>Total Populatation: {totalPopulation}</p>
              <p>Average Populatation: {(totalPopulation / generation || 0).toFixed(2)}</p>
          </div>
          <div>
            <div className="flex flex-col w-full h-12 px-4 my-2 justify-around">
              <h4>Grid Size : {gridSize}</h4>
              <Slider defaultValue={[gridSize]} min={10} max={100} step={1} onValueChange={value => setGridSize(value[0])} disabled={!isEdit} />
            </div>
            <div className="flex flex-col h-12 px-4 my-4 justify-around">
              <div className="flex justify-between">
                <h4>Auto Run Config</h4>
                <Switch
                  checked={shouldAutoIterate}
                  onCheckedChange={() => setShouldAutoIterate(!shouldAutoIterate)}
                  disabled={!isEdit}
                />
              </div>
              <div className="flex space-x-2 justify-between">
                <Slider defaultValue={[autoRunFactor]} min={0.5} max={10} step={0.25} onValueChange={value => setAutoRunFactor(value[0])} disabled={!isEdit || !shouldAutoIterate} />
                <p className="w-[5ch]">&times;{autoRunFactor}</p>
              </div>
            </div>
            <div className="flex flex-row justify-evenly h-12 mb-2">
              <Button
                onClick={() => {
                  if (gameRef.current) {
                    gameRef.current?.setRandomGame();
                  }
                }}
                disabled={!isEdit}
              >
                🔀
              </Button>
              <Button
                onClick={() => setRunningState(RunningState.RUNNING)}
                disabled={!isEdit}
              >
                ▶
              </Button>
              <Button
                onClick={() => {
                  if (gameRef.current) {
                    gameRef.current?.iterate();
                  }
                }}
                disabled={!isEdit || shouldAutoIterate}
              >
                ️⏭️
              </Button>
              <Button
                onClick={() => setRunningState(RunningState.STOPPED)}
                disabled={isEdit}
              >
                ⏹️
              </Button>
              <Button
                onClick={() => {
                  if (gameRef.current) {
                    gameRef.current?.reset();
                  }
                }}
                disabled={!isEdit}
              >
                ❌
              </Button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
