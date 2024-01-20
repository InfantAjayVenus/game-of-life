import Row from "./Row"

export default function Grid({ values, updateGrid }: { values: Boolean[][], updateGrid: (updatedGridState: Boolean[][]) => void }) {
    return (
        <>
            <div className="m-auto w-[100vh] h-[100vh] max-h-[100vh] grid grid-flow-row" >
                {values.map((row, index) => {
                    return (
                        <Row
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