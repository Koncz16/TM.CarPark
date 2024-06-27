import { useContext } from "react"
import "./Footer.css"
import { CounterContext } from "../provider/CounterProvider"
import { useMainStore } from "../state/useMainStore"

export default function Footer() {
    // const data = useContext(CounterContext)

    const counter = useMainStore(state => state.counter)

    return (
     <>
     This site is for learning {counter}
     </>   
    )
}