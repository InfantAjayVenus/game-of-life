export default function Cell({ value, updateCell }: { value: Boolean, updateCell: (updatedCellState: Boolean) => void }) {
    return (
        <>
            <div
                className={`box-border border border-black ${value ? "bg-black hover:bg-gray-700" : "bg-transparent hover:bg-gray-400"} text-center`}
                onClick={() => {
                    updateCell(!value);
                }}
            />
        </>
    )
}