import { useEffect, useState } from "react";
import { Slider } from "./@/components/ui/slider";
import Grid from "./components/Grid";


export default function App() {
  const [gridSize, setGridSize] = useState(15);
  const [stateGrid,setStateGrid] = useState(new Array(gridSize).fill([]).map(_ => new Array(gridSize).fill(false)));
  //.map((_) => Math.floor(Math.random() * 100) % 2 !== 0));

  useEffect(() => {
    setStateGrid(new Array(gridSize).fill([]).map(_ => new Array(gridSize).fill(false)));
  }, [gridSize])

  return (
    <>
      <div className="grid grid-cols-3">
        <div className="flex flex-col items-start col-span-1 border border-black m-4 p-4 rounded-lg">
          <div className="flex flex-col w-full h-16 justify-around">
            <h4>Grid Size : {gridSize}</h4>
            <Slider defaultValue={[gridSize]} min={10} max={100} step={1} onValueChange={value => setGridSize(value[0])}/>
          </div>
        </div>
        <Grid values={stateGrid} updateGrid={setStateGrid}/>
        <div className="flex flex-row col-span-1"></div>
      </div>
    </>
  )
}
