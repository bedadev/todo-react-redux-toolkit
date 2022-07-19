import { useAppDispatch, useAppSelector } from "../app/hooks"
import { amoundAdded, decrement, increment } from "../features/counterSlice"

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="p-5 flex items-center">
      <button
        onClick={() => dispatch(decrement())}
        className="h-10 px-4 bg-slate-800 rounded-md text-white text-2xl font-extrabold"
      >
        -
      </button>
      <span className="min-w-[3rem] text-center text-lg">{count}</span>
      <button
        onClick={() => dispatch(increment())}
        className="h-10 px-4 bg-slate-800 rounded-md text-white text-2xl font-extrabold"
      >
        +
      </button>
      <button
        onClick={() => dispatch(amoundAdded(2))}
        className="h-10 px-4 ml-2 bg-slate-800 rounded-md text-white text-xl font-bold"
      >
        +2
      </button>
    </div>
  )
}

export default Counter
