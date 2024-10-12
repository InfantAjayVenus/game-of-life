import { SparsePoint } from "../../../types/SparsePoints";

export function runGame(gameState: SparsePoint[]):SparsePoint[] {
    
    const neighbourOffsets:SparsePoint[] = [{x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: -1, y: 0}, {x: 1, y: 0}, {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}];

    const neighbourCountMap = gameState.reduce((countMap, cellPoint) => {
        neighbourOffsets.map(offsetPoint => ({x: cellPoint.x + offsetPoint.x, y: cellPoint.y + offsetPoint.y}))
            .forEach(neighbourPoint => countMap[`${neighbourPoint.x}_${neighbourPoint.y}`] = (countMap[`${neighbourPoint.x}_${neighbourPoint.y}`] || 0) + 1)
        return countMap;
    }, {} as Record<string, number>);

    const updatedGameState = Object.entries(neighbourCountMap)
        .filter(([key, count]) => {
            if (count > 3 || count < 2) return false;
            if(count === 2) {
                const [x,y] = key.split('_');
                return !!gameState.find(cellPoint => cellPoint.x === parseInt(x) && cellPoint.y === parseInt(y));
            }

            return true;
        })
        .map(([key]) => ({x: parseInt(key.split("_")[0]), y: parseInt(key.split("_")[1])}))

    return updatedGameState;


}

export function getRandomGame(gridSize: number, transformOffset: SparsePoint): SparsePoint[] {
    return new Array(gridSize).fill(new Array(gridSize)).map(
        row => row.fill(false).map(() => Math.random() > 0.5)
    ).reduce(
        (sparsePointsList, row, rowIndex) => sparsePointsList.concat(
            row.map((cell:boolean, colIndex: number) => cell ? ({x: rowIndex - transformOffset.x, y: colIndex - transformOffset.y}) : null)
                .filter((point: boolean | SparsePoint) => !!point)
        ), 
        [] as SparsePoint[]
    )
}