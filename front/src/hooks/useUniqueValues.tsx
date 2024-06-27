import { useMemo } from "react";

export function useUniqueValues(cars: any[], key: string, filterKey?: string, filterValue?: string): string[] {
    return useMemo(() => {
        const filteredCars = filterKey && filterValue ? cars.filter(car => car[filterKey] === filterValue) : cars;
        const values = filteredCars.map(car => car[key]);
        return Array.from(new Set(values));
    }, [cars, key, filterKey, filterValue]);
}
