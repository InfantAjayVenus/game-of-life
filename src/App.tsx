import { useEffect, useState } from "react";
import { Slider } from "./@/components/ui/slider";
import Grid from "./components/Grid";
import Button from "./components/Button";
import { runGame } from "./lib/GameOdLife";


export default function App() {
  const [isEdit, setIsEdit] = useState(true);
  const [gridSize, setGridSize] = useState(15);
  const [stateGrid, setStateGrid] = useState(new Array(gridSize).fill([]).map(_ => new Array(gridSize).fill(false)));

  const [liveCount, setLiveCount] = useState(0);
  const [iterationCount, setIterationCount] = useState(0);
  const [totalLiveCount, setTotalLiveCount] = useState(0);

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
  }

  const onStop = () => {
    setIsEdit(true);
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-start col-span-1 border border-black m-4 p-4 rounded-lg">
          <div className="flex flex-col w-full h-16 justify-around">
            <h4>Grid Size : {gridSize}</h4>
            <Slider defaultValue={[gridSize]} min={10} max={100} step={1} onValueChange={value => setGridSize(value[0])} disabled={!isEdit} />
          </div>
          <div className="mt-16 flex justify-around transition-all">
            <Button
              onClick={onStart}
              disabled={!isEdit}
            >
              Start ▶
            </Button>
            <Button
              onClick={onIterate}
              disabled={isEdit}
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
          <div className="my-8 px-4">
            <p>Iteration: {iterationCount}</p>
            <p>Current Populatation: {liveCount}</p>
            <p>Average Populatation: {(totalLiveCount / iterationCount || 0).toFixed(2)}</p>
          </div>
        </div>
        <Grid values={stateGrid} updateGrid={setStateGrid} isEdit={isEdit} />
        {/* <div className="flex flex-row col-span-1"></div> */}
      </div>
    </>
  )
}
