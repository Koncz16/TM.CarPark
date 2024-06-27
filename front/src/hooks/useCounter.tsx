import { useEffect, useState } from "react";

export function useCounter(){
    const [counter, setCounter] = useState(0)

    function handleCounterChange(increment?:boolean){
        if(increment){
            setCounter((prev) =>prev + 1)
            // localStorage.setItem("counter", counter as any)
            return
        }
        setCounter((prev) =>prev - 1)
        // localStorage.setItem("counter", counter as any)
      }
      
      // useEffect(() => {
      //   localStorage.setItem("counter", counter as any)
      // }, [counter])
      
      useEffect(() => {
        // setCounter(localStorage.getItem("counter") as any)
        // console.log(localStorage.getItem("counter"))
      }, [counter])



      return {counter, 
        increment:() => handleCounterChange(true),
         decrement: () => handleCounterChange(false)}
}