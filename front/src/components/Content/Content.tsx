import "./Content.css"
import CarItem from "../CarItem/CarItem"
import { useEffect, useState } from "react"
import { useCarsList } from "../../hooks/useCarsList"
import ErrorMessage from "../shared/ErrorMessage"

export default function Content() {

   const{carsList, isError, isLoading} = useCarsList()   // hasznaljuk a sajat hook-ot


// a logika atkerult a useCarsList-be

// Homework: Megcsinálni mindent type safe-re

    if(isLoading){ 
    return <div>
        <h1>Loading...</h1>
        </div>
    }


    return (
        <div className="carsList">
            {isError && <ErrorMessage/>}
            {!isError && carsList?.map((car, index) => {

                return (<div key={index}>
                    <CarItem car={car} />
                </div>
                )
            })}
        </div>
    )
}