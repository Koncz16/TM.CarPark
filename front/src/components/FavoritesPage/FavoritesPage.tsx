import React from "react";
import { Car } from "../../models";
import "./FavoritesPage.css";
import useLocalStorageData from "../../hooks/useLocalStorage";

const FavoritesPage = () => {
  const { list: favoriteCars, removeItem } = useLocalStorageData("favorites");

  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      {favoriteCars.length === 0 ? (
        <p>No favorite cars selected.</p>
      ) : (
        <ul className="car-list">
          {favoriteCars.map((car) => (
            <li key={car.vin} className="car-item">
              <div className="car-details">
                <img
                  src={`http://localhost:3019/img/${car.image}`}
                  alt={`${car.manufacturer} ${car.model}`}
                />
                <div>
                  <h3>
                    {car.manufacturer} {car.model}
                  </h3>
                  <p>Construction Year: {car.constructionYear}</p>
                  <p>Fuel Type: {car.fuelType}</p>
                  <p>Price: {car.price} EUR</p>
                </div>
              </div>
              <button
                className="remove-button"
                onClick={() => removeItem(car.vin)}
              >
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
