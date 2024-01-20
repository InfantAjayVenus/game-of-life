import Row from "./Row"

export default function Grid({ values, isEdit, updateGrid }: { isEdit: Boolean, values: Boolean[][], updateGrid: (updatedGridState: Boolean[][]) => void }) {
    return (
        <>
            <div className="p-4 w-[100vh] h-[100vh] max-h-[100vh] grid grid-flow-row" >
                {values.map((row, index) => {
                    return (
                        <Row
                            isEdit={isEdit}
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