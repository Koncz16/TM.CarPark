import "./Content.css";
import CarItem from "../CarItem/CarItem";
import { useState } from "react";
import { useCarsList } from "../../hooks/useCarsList";
import { useUniqueValues } from "../../hooks/useUniqueValues";
import ErrorMessage from "../shared/ErrorMessage";
import { Car } from "../../models";

export default function Content() {
  const { carsList, isError, isLoading } = useCarsList();

  // Filter states
  const [manufacturer, setManufacturer] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [constructionYear, setConstructionYear] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  // Get unique values for dropdowns using custom hook
  const manufacturers = useUniqueValues(carsList, "manufacturer");
  const models = useUniqueValues(
    carsList,
    "model",
    "manufacturer",
    manufacturer
  );
  const fuelTypes = useUniqueValues(carsList, "fuelType");

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

  // Sort function
  const sortCars = (cars: Car[]) => {
    switch (sortBy) {
      case "price-asc":
        return cars.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "price-desc":
        return cars.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case "year-asc":
        return cars.sort(
          (a, b) => parseInt(a.constructionYear) - parseInt(b.constructionYear)
        );
      case "year-desc":
        return cars.sort(
          (a, b) => parseInt(b.constructionYear) - parseInt(a.constructionYear)
        );
      case "power-asc":
        return cars.sort((a, b) => parseInt(a.power) - parseInt(b.power));
      case "power-desc":
        return cars.sort((a, b) => parseInt(b.power) - parseInt(a.power));
      default:
        return cars;
    }
  };

  // Filter and sort function
  const filterAndSortCars = () => {
    const parsedMinPrice = minPrice ? parseFloat(minPrice) : null;
    const parsedMaxPrice = maxPrice ? parseFloat(maxPrice) : null;

    const filteredCars = carsList.filter((car: Car) => {
      const carPrice =
        typeof car.price === "string" ? parseFloat(car.price) : car.price;

      return (
        (manufacturer ? car.manufacturer === manufacturer : true) &&
        (model ? car.model === model : true) &&
        (constructionYear
          ? car.constructionYear.toString() === constructionYear
          : true) &&
        (parsedMinPrice !== null && parsedMaxPrice !== null // only works if both fields are filled in
          ? carPrice * 1000 >= parsedMinPrice &&
            carPrice * 1000 <= parsedMaxPrice
          : true) &&
        (fuelType ? car.fuelType === fuelType : true) &&
        // Search by manufacturer or model
        (searchTerm
          ? car.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.model.toLowerCase().includes(searchTerm.toLowerCase())
          : true)
      );
    });

    return sortCars(filteredCars);
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
        <select
          value={manufacturer}
          onChange={(e) => handleManufacturerChange(e.target.value)}
        >
          <option value="">All Manufacturers</option>
          {manufacturers.map((man: string, index: number) => (
            <option key={index} value={man}>
              {man}
            </option>
          ))}
        </select>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          disabled={manufacturer === ""}
        >
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

      {/* Sort dropdown */}
      <div className="sort-form">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price-asc">Price (Ascending)</option>
          <option value="price-desc">Price (Descending)</option>
          <option value="year-asc">Year (Ascending)</option>
          <option value="year-desc">Year (Descending)</option>
          <option value="power-asc">Power (Ascending)</option>
          <option value="power-desc">Power (Descending)</option>
        </select>
      </div>

      <div className="carsList">
        {!isError &&
          filterAndSortCars().map((car: Car, index: number) => (
            <div key={index}>
              <CarItem car={car} />
            </div>
          ))}
      </div>

      {/* <div className="carsList">
        {!isError &&
          filterCars().map((car: Car, index: number) => (
            <div key={index}>
              <CarItem car={car} />
            </div>
          ))}
      </div> */}
    </div>
  );
}
