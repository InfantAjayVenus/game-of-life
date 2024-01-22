export default function Cell({ value, isEdit, isDraw, updateCell }: { isEdit: Boolean, isDraw: boolean, value: Boolean, updateCell: (updatedCellState: Boolean) => void }) {
    return (
        <>
            <div
                className={
                    `
                    box-border 
                    border border-black 
                    ${isEdit? "border-black" : "border-gray-400"}
                    ${value ? "bg-black " : "bg-transparent "} 
                    ${value ? 'hover:bg-gray-700' : "hover:bg-gray-400"}
                    `
                }
                onClick={() => {
                    updateCell(!value);
                }}
                onMouseOver={() => {
                    if(!isDraw) return;
                    updateCell(true);
                }}
            />
        </>
    )
}