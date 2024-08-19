export const DaySelector = ({ currentDay, setCurrentDay, i, time }) => {
  return (
    <button
      onClick={() => setCurrentDay(i)}
      className={`rounded p-1 ${currentDay === i ? "bg-accent font-medium text-foreground" : "text-muted-foreground hover:bg-accent/50"}`}
    >
      {typeof time === "string" ? (
        time
      ) : (
        <div className="flex flex-col items-center">
          {time.month}
          <div className="-mt-1.5 text-xl">{time.day}</div>
        </div>
      )}
    </button>
  )
}

export default DaySelector
