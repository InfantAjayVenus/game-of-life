export default function Cell({ value, isEdit, updateCell }: { isEdit: Boolean, value: Boolean, updateCell: (updatedCellState: Boolean) => void }) {
    return (
        <>
            <div
                className={
                    `
                    box-border 
                    border
                    ${isEdit? "border-black" : "border-gray-400"}
                    ${value ? "bg-black " : "bg-transparent "} 
                    ${isEdit ? `${value ? 'hover:bg-gray-700' : "hover:bg-gray-400"}` : ""}
                    `
                }
                onClick={() => {
                    if(!isEdit) return;
                    updateCell(!value);
                }}
            />
        </>
    )
}