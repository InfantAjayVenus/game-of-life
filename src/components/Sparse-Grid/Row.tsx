import Cell from "./Cell";

export default function Row({ isEdit, isDraw, values, updateRow }: { isEdit: Boolean, isDraw: boolean, values: Boolean[], updateRow: (colIndex: number) => void }) {
    return (
        <>
            <div className="grid w-full grid-flow-col-dense">
                {values.map((cellValue, index) => (
                    <>
                        <Cell
                            key={`col-${index}`}
                            isEdit={isEdit}
                            isDraw={isDraw}
                            value={cellValue}
                            updateCell={() => {
                                updateRow(index);
                            }}
                        />
                    </>
                ))}
            </div>
        </>
    )
}