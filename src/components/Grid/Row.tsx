import Cell from "./Cell";

export default function Row({ isEdit, isDraw, values, updateRow }: { isEdit: Boolean, isDraw: boolean, values: Boolean[], updateRow: (updatedRowValues: Boolean[]) => void }) {
    return (
        <>
            <div className="grid w-full grid-flow-col-dense">
                {values.map((cellValue, index) => (
                    <>
                        <Cell
                            isEdit={isEdit}
                            isDraw={isDraw}
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