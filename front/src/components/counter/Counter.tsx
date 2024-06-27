import { useContext } from "react"
import { useCounter } from "../../hooks/useCounter"
import { CounterContext } from "../provider/CounterProvider"
import { useMainStore } from "../state/useMainStore"

export default function Counter(){

    // const{ counter, increment, decrement} = useCounter()  // haszaljuk a sajat hook-ot

    // const {counter, increment, decrement} = useContext(CounterContext)

    const counter = useMainStore(state => state.counter)
    const increment = useMainStore(state => state.increment)
    const decrement = useMainStore(state => state.decrement)

    // function increment(){
    //     data.setCounter(data.counter + 1)
    // }
    // function decrement(){
    //     data.setCounter(data.counter - 1)
    // }



    return (
        <div>
            <p>Counter value</p>
            <h2>{counter}</h2>
            <button onClick={increment}>Increment by one</button>
            <button onClick={decrement}>Decrease by one</button>
        </div>)
}