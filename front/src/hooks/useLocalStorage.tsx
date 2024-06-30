import { useEffect, useState } from "react";
import { Car } from "../models";

function useLocalStorageData(key: string) {
  const [list, setList] = useState<Car[]>([]);

  useEffect(() => {
    const storedItem = window.localStorage.getItem(key);

    if (storedItem) {
      setList(JSON.parse(storedItem));
    }
  }, [key]);

  const addItem = (car: Car) => {
    var updatedList: Car[] = [...list, car];

    const storedItem = window.localStorage.getItem(key);
    if (storedItem) {
      updatedList = JSON.parse(storedItem);
      updatedList.push(car);
      setList(updatedList);
    }
    window.localStorage.setItem(key, JSON.stringify(updatedList));
  };

  const removeItem = (vin: string) => {
    const updatedList = list.filter((car) => car.vin !== vin);
    setList(updatedList);
    window.localStorage.setItem(key, JSON.stringify(updatedList));
  };

  return { list, addItem, removeItem };
}

export default useLocalStorageData;
