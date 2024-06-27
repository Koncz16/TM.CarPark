import { create } from "zustand"

 // helyettesiti a context-et

type MainSlice = {
    counter : number,
    increment: () => void,
    decrement: () => void
}

export const useMainStore = create<MainSlice>()((set)=> ({
    counter: 0,
    increment:() => set(state => increment(state)),
    decrement:() => set(state => decrement(state)),
}))

function increment (state: MainSlice){
    return {counter: state.counter + 1}
}

function decrement (state: MainSlice){
    return {counter: state.counter - 1}
}
