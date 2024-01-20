import Row from "./Row"

export default function Grid({ values }: { values: Boolean[][], updateGrid: (updatedGridState: Boolean[][]) => void }) {
  return (
    <>
      <div className="m-auto w-[100vh] h-[100vh] max-h-[100vh] grid grid-flow-row" >
        {values.map(row => {
          return <Row values={row} />
        })}
      </div>
    </>
  )
}