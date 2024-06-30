import { Children, ReactNode, createContext, useEffect, useState } from "react";
import "./App.css";
import Content from "./components/Content/Content.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Header from "./components/Header/Header.tsx";
import { useCounter } from "./hooks/useCounter.tsx";
import Counter from "./components/counter/Counter.tsx";
import { CounterProvider } from "./components/provider/CounterProvider.tsx";
import FavoritesPage from "./components/FavoritesPage/FavoritesPage.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BasketPage from "./components/BasketPage/BasketPage.tsx";

function App() {
  // const [counter, setCounter] = useState(0)

  // useEffect(()=>{
  //   console.log("Setting counter to 100")
  //   setCounter(100)
  // },[])

  // useEffect(()=>{
  //   return ()=>{
  //     console.log("Unmounting")
  //   }
  // },[])
  useEffect(() => {
    console.log("Mounted");
  }, []);

  // useEffect(()=>{
  //   console.log("Counter changed")
  // },[counter])   // filter-eket is meg lehet ezzel csinálni

  // function handleCounterIncrement(){
  //   setCounter((prev) =>prev + 1)
  // }

  // function handleCounterDecrement(){
  //   setCounter((prev) =>prev - 1)
  // }

  // function handleCounterChange(increment?:boolean){
  //   if(increment){
  //       setCounter((prev) =>prev + 1)
  //       return
  //   }
  //   setCounter((prev) =>prev - 1)

  // }

  // Ctr + K + C Comment
  // Ctr + K + U UnComment

  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/favorites/" element={<FavoritesPage />} />
          <Route path="/basket/" element={<BasketPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
