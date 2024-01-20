export default function Cell({ value }: { value: Boolean }) {
  return (
    <>
      <span className={`box-border border border-black ${value ? "bg-black" : "bg-transparent"} text-center inline-block `}>
      </span>
    </>
  )
}