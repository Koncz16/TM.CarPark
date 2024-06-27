// minden hook ele kell a use nev
import { useEffect, useState } from "react"
import { Car } from "../models"

export function useCarsList(){
    const [isLoading, setIsLoading] =useState(false)
    const [isError, setIsError] =useState(false)
    const [carsList, setCarList ] =useState<Car[]>([]);

    async function getCarList() {
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:3019/car");
            if (res.ok) {
                setIsError(false);
                const data: Car[] = await res.json();
                setCarList(data);
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCarList();
    }, []);

    return {
        carsList,
        isError,
        isLoading
    };

}