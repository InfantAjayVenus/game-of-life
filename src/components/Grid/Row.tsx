import Cell from "./Cell";

export default function Row({ values, updateRow }: { values: Boolean[], updateRow: (updatedRowValues: Boolean[]) => void }) {
    return (
        <>
            <div className="grid w-full grid-flow-col-dense">
                {values.map((cellValue, index) => (
                    <>
                        <Cell
                            value={cellValue}
                            updateCell={(updateCellState) => {
                                const updatedRowState = [...values];
                                updatedRowState[index] = updateCellState;

                                updateRow(updatedRowState);
                            }}
                        />
                    </>
                ))}
            </div>
        </>
    )
}