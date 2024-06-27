import "./Content.css";
import CarItem from "../CarItem/CarItem";
import { useState } from "react";
import { useCarsList } from "../../hooks/useCarsList";
import { useUniqueValues } from "../../hooks/useUniqueValues";
import ErrorMessage from "../shared/ErrorMessage";
import { Car } from "../../models";

export default function Content() {
    const { carsList, isError, isLoading } = useCarsList(); // hasznaljuk a sajat hook-ot

    // Filter states
    const [manufacturer, setManufacturer] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [constructionYear, setConstructionYear] = useState<string>("");
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");
    const [fuelType, setFuelType] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term

    // Get unique values for dropdowns using custom hook
    const manufacturers = useUniqueValues(carsList, 'manufacturer');
    const models = useUniqueValues(carsList, 'model', 'manufacturer', manufacturer);
    const fuelTypes = useUniqueValues(carsList, 'fuelType');

    // Clear filters function
    const clearFilters = () => {
        setManufacturer("");
        setModel("");
        setConstructionYear("");
        setMinPrice("");
        setMaxPrice("");
        setFuelType("");
        setSearchTerm(""); 
    };

    // Handle manufacturer change
    const handleManufacturerChange = (selectedManufacturer: string) => {
        setManufacturer(selectedManufacturer); // Set selected manufacturer

        // If All Manufacturers is selected, clear model filter
        if (selectedManufacturer === "") {
            setModel(""); 
        }
    };

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    // Filter function
    const filterCars = () => {
        // Convert minPrice and maxPrice to numbers
        const parsedMinPrice = minPrice ? parseFloat(minPrice) : null;
        const parsedMaxPrice = maxPrice ? parseFloat(maxPrice) : null;

        return carsList.filter((car: Car) => {
            const carPrice = typeof car.price === 'string' ? parseFloat(car.price) : car.price;

            return (
                (manufacturer ? car.manufacturer === manufacturer : true) &&
                (model ? car.model === model : true) &&
                (constructionYear ? car.constructionYear.toString() === constructionYear : true) &&
                ((parsedMinPrice !== null && parsedMaxPrice !== null) ?   // only works if both fields are filled in
                ((carPrice * 1000) >= parsedMinPrice && (carPrice * 1000) <= parsedMaxPrice) : true) &&
                (fuelType ? car.fuelType === fuelType : true) &&
                // Search by manufacturer or model
                (searchTerm ? 
                    car.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    car.model.toLowerCase().includes(searchTerm.toLowerCase())
                    : true)
            );
        });
    };

    return (
        <div>
            {isError && <ErrorMessage />}
            
            {/* Search bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Manufacturer or Model"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="filter-form">
                <select value={manufacturer} onChange={(e) => handleManufacturerChange(e.target.value)}>
                    <option value="">All Manufacturers</option>
                    {manufacturers.map((man: string, index: number) => (
                        <option key={index} value={man}>
                            {man}
                        </option>
                    ))}
                </select>
                <select value={model} onChange={(e) => setModel(e.target.value)} disabled={manufacturer === ""}>
                    <option value="">All Models</option>
                    {models.map((mod: string, index: number) => (
                        <option key={index} value={mod}>
                            {mod}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Construction Year"
                    value={constructionYear}
                    onChange={(e) => setConstructionYear(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
                    <option value="">All Fuel Types</option>
                    {fuelTypes.map((fuel: string, index: number) => (
                        <option key={index} value={fuel}>
                            {fuel}
                        </option>
                    ))}
                </select>
                <div className="clear-filters">
                    <button onClick={clearFilters}>Clear Filters</button>
                </div>
            </div>

            <div className="carsList">
                {!isError && filterCars().map((car: Car, index: number) => (
                    <div key={index}>
                        <CarItem car={car} />
                    </div>
                ))}
            </div>
        </div>
    );
}
