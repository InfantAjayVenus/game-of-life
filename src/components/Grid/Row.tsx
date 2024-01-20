import Cell from "./Cell";

export default function Row({ values }: { values: Boolean[] }) {
  return (
    <>
      <div className="grid w-full grid-flow-col-dense">
        {values.map(cellValue => (
          <>
            <Cell value={cellValue}/>
          </>
        ))}
      </div>
    </>
  )
}