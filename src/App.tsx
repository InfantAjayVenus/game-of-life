import { useEffect, useState } from "react";
import { Slider } from "./@/components/ui/slider";
import Grid from "./components/Grid";
import Button from "./components/Button";
import { getRandomGame, runGame } from "./lib/GameOfLife";
import { Checkbox } from "./@/components/ui/checkbox";

const ITERATION_TIME = 1000;
export default function App() {
  const [isEdit, setIsEdit] = useState(true);
  const [shouldAutoIterate, setShouldAutoIterate] = useState(true);
  const [gridSize, setGridSize] = useState(15);
  const [stateGrid, setStateGrid] = useState(new Array(gridSize).fill([]).map(_ => new Array(gridSize).fill(false)));

  const [liveCount, setLiveCount] = useState(0);
  const [iterationCount, setIterationCount] = useState(0);
  const [totalLiveCount, setTotalLiveCount] = useState(0);
  const [iteratorTimer, setIteratorTimer] = useState<number | undefined>();
  const [autoRunFactor, setAutoRunFactor] = useState(2);

  useEffect(() => {
    setStateGrid(new Array(gridSize).fill([]).map(_ => new Array(gridSize).fill(false)));
  }, [gridSize])

  useEffect(() => {

    setLiveCount(stateGrid.reduce((sum, row) => {
      return sum + row.filter(item => item).length;
    }, 0));

    if (liveCount === 0) {
      onStop();
    }

  }, [stateGrid])

  const onReset = () => {
    setStateGrid(new Array(gridSize).fill([]).map(_ => new Array(gridSize).fill(false)));
    setIterationCount(0);
    setTotalLiveCount(0);
  }

  const onStart = () => {
    setIsEdit(false);
    setIterationCount(0);
    setTotalLiveCount(0);
    onIterate();
  }

  const onIterate = () => {
    setTotalLiveCount(currentTotalCount => currentTotalCount + liveCount);
    setStateGrid(currentStateGrid => runGame(currentStateGrid));
    setIterationCount(iterationCount => iterationCount + 1);
    
    if (shouldAutoIterate) {
      clearTimeout(iteratorTimer);
      setIteratorTimer(
        setTimeout(() => {
          onIterate();
        }, ITERATION_TIME / autoRunFactor)
      );
    }
  }

  const onStop = () => {
    setIsEdit(true);
    clearTimeout(iteratorTimer);
  }

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
              onClick={() => setStateGrid(getRandomGame(gridSize))}
              disabled={!isEdit}
            >
              Random 🔀
            </Button>
          </div>
          <div className="my-8 flex justify-around transition-all">
            <Button
              onClick={onStart}
              disabled={!isEdit}
            >
              Start ▶
            </Button>
            <Button
              onClick={onIterate}
              disabled={isEdit || shouldAutoIterate}
            >
              Next ️⏭️
            </Button>
            <Button
              onClick={onStop}
              disabled={isEdit}
            >
              Stop ⏹️
            </Button>
            <Button
              onClick={onReset}
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
            <p>Iteration: {iterationCount}</p>
            <p>Current Population: {liveCount}</p>
            <p>Average Population: {(totalLiveCount / iterationCount || 0).toFixed(2)}</p>
            <p>Total Population: {totalLiveCount}</p>
          </div>
        </div>
        <Grid values={stateGrid} updateGrid={setStateGrid} isEdit={isEdit} />
      </div>
    </>
  )
}
