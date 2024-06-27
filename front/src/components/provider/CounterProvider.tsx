import { FC, ReactNode, createContext, useState } from "react"
import { useCounter } from "../../hooks/useCounter"

type CounterContextType ={
    counter:number, 
    // setCounter?: (counter:number)=>void
    increment: ()=>void,
    decrement: ()=>void
}

export const CounterContext = createContext<CounterContextType>({
  counter : 0,
  increment: ()=>{}, 
  decrement: ()=>{}
})

type Props={
  children:ReactNode
  
}

export const CounterProvider : FC<Props> = ({children}) =>{

    const {counter, increment, decrement} = useCounter()

    return <CounterContext.Provider value={
      {
      counter,
      increment, 
      decrement
      }
    }> 
    {children}
    </CounterContext.Provider>
}