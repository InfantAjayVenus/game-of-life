import { useRef, useState } from "react";
import { Checkbox } from "./@/components/ui/checkbox";
import { Slider } from "./@/components/ui/slider";
import Button from "./components/Button";
import Grid from "./components/Grid";
import { GameRef, GameStats } from "./types/GameRef";
import { RunningState } from "./types/RunningState";

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
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-start col-span-1 border border-black m-4 p-4 rounded-lg">
          <div className="flex flex-col w-full h-16 justify-around">
            <h4>Grid Size : {gridSize}</h4>
            <Slider defaultValue={[gridSize]} min={10} max={100} step={1} onValueChange={value => setGridSize(value[0])} disabled={!isEdit} />
          </div>
          <div className="my-8 py-4">
            <Button
              onClick={() => {
                if (gameRef.current) {
                  gameRef.current?.setRandomGame();
                }
              }}
              disabled={!isEdit}
            >
              Random 🔀
            </Button>
          </div>
          <div className="my-8 flex justify-around transition-all">
            <Button
              onClick={() => setRunningState(RunningState.RUNNING)}
              disabled={!isEdit}
            >
              Start ▶
            </Button>
            <Button
              onClick={() => {
                if (gameRef.current) {
                  gameRef.current?.iterate();
                }
              }}
              disabled={!isEdit || shouldAutoIterate}
            >
              Next ️⏭️
            </Button>
            <Button
              onClick={() => setRunningState(RunningState.STOPPED)}
              disabled={isEdit}
            >
              Stop ⏹️
            </Button>
            <Button
              onClick={() => {
                if (gameRef.current) {
                  gameRef.current?.reset();
                }
              }}
              disabled={!isEdit}
            >
              Clear ❌
            </Button>
          </div>
          <div className="flex my-8 px-4 space-x-2 items-center">
            <Checkbox
              id="auto-iterate-toggle"
              checked={shouldAutoIterate}
              onCheckedChange={() => setShouldAutoIterate(!shouldAutoIterate)}
              disabled={!isEdit}
            />
            <label htmlFor="auto-iterate-toggle">Run Automatically</label>
          </div>
          <div className="flex flex-col w-full h-16 justify-around">
            <h4>Auto Run Speed : x{autoRunFactor}</h4>
            <Slider defaultValue={[autoRunFactor]} min={0.5} max={10} step={0.25} onValueChange={value => setAutoRunFactor(value[0])} disabled={!isEdit || !shouldAutoIterate} />
          </div>
          <div className="my-8 px-4">
            <p>Generation: {generation}</p>
            <p>Current Populatation: {currentPopulation}</p>
            <p>Total Populatation: {totalPopulation}</p>
            <p>Average Populatation: {(totalPopulation / generation || 0).toFixed(2)}</p>
          </div>
        </div>
        <Grid
          ref={gameRef}
          gridSize={gridSize}
          autoIterateFactor={autoRunFactor}
          shouldAutoIterate={shouldAutoIterate}
          runningState={runningState}
          updateGameStats={updateGameStats}
        />
      </div>
    </>
  )
}
