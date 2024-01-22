import { useState } from "react";
import Row from "./Row"

export default function Grid({ values, isEdit, updateGrid }: { isEdit: Boolean, values: Boolean[][], updateGrid: (updatedGridState: Boolean[][]) => void }) {
    const [isDrawing, setIsDrawing] = useState(false);

    return (
        <>
            <div 
            className="p-4 w-[100vh] h-[100vh] max-h-[100vh] grid grid-flow-row" 
            onMouseDown={() => {
                setIsDrawing(true);
            }}
            onMouseUp={() => {
                setIsDrawing(false);
            }}
            >
                {values.map((row, index) => {
                    return (
                        <Row
                            isEdit={isEdit}
                            isDraw={isDrawing}
                            values={row}
                            updateRow={(updatedRowValues) => {
                                const updatedGridState = [...values];
                                updatedGridState[index] = updatedRowValues;

                                updateGrid(updatedGridState);
                            }}
                        />
                    )
                })}
            </div>
        </>
    )
}