export function runGame(gameState: Boolean[][]):Boolean[][] {
    return gameState.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
            const neighbours = [
                gameState.at(rowIndex - 1)?.at(cellIndex - 1) || false,
                gameState.at(rowIndex - 1)?.at(cellIndex) || false,
                gameState.at(rowIndex - 1)?.at(cellIndex + 1) || false,
                gameState.at(rowIndex)?.at(cellIndex - 1) || false,
                gameState.at(rowIndex)?.at(cellIndex + 1) || false,
                gameState.at(rowIndex + 1)?.at(cellIndex - 1) || false,
                gameState.at(rowIndex + 1)?.at(cellIndex) || false,
                gameState.at(rowIndex + 1)?.at(cellIndex + 1) || false,
            ]

            const liveNeighboursCount = neighbours.filter(value => value).length;

            if(!cell && liveNeighboursCount === 3) return true;
            if(cell) {
                if(liveNeighboursCount < 2) return false;
                if(liveNeighboursCount > 3) return false;
            }

            return cell;
        })
    })
}