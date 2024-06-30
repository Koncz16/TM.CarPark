import { useEffect, useState } from "react";
import { Car } from "../../models";
import "./CarItem.css";
import useLocalStorageData from "../../hooks/useLocalStorage";
import useBasketStore from "../state/useBasketStore";

type Props = {
  car: Car;
};

export default function CarItem({ car }: Props) {
  const key = "favorites";
  const { list, addItem, removeItem } = useLocalStorageData(key);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { basketItems, addToBasket, removeFromBasket } = useBasketStore();

  const isInBasket = basketItems.some((item) => item.vin === car.vin);

  const handleAddToBasket = () => {
    addToBasket(car);
  };

  const handleRemoveFromBasket = () => {
    removeFromBasket(car);
  };

  const equipments = car.equipment.split(",");

  useEffect(() => {
    // Check if car VIN is in favoriteCars list
    setIsChecked(list.some((favoriteCar) => favoriteCar.vin === car.vin));
  }, [list, car.vin]);

  const handleClick = () => {
    const labels = document.querySelectorAll(".label");
    if (labels.length > 0) {
      labels.forEach((label) => (label.className = "coloredLabel"));
      return;
    }
    const coloredLabels = document.querySelectorAll(".coloredLabel");
    if (coloredLabels.length > 0) {
      coloredLabels.forEach((label) => (label.className = "label"));
      return;
    }
  };

  const handleCheckboxChange = () => {
    if (isChecked) {
      removeItem(car.vin);
    } else {
      addItem(car);
    }
    setIsChecked(!isChecked);
  };

  return (
    <div className="carItem">
      <div className="imageContainer">
        <img
          src={`http://localhost:3019/img/${car.image}`}
          className="carImage"
          alt={`${car.manufacturer} ${car.model}`}
        />
      </div>
      <div className="details">
        <div className="row">
          <div className="label">Manufacturer:</div> {car.manufacturer}
        </div>
        <div className="row">
          <div className="label">Model:</div> {car.model}
        </div>
        <div className="row">
          <div className="label">Construction Year:</div> {car.constructionYear}
        </div>
        <div className="row">
          <div className="label">Fuel Type:</div> {car.fuelType}
        </div>
        <div className="row">
          <div className="label">Horse Power:</div> {car.power}
        </div>
        <div className="row">
          <div className="label">Engine Size:</div> {car.engineSize}
        </div>
        <br />
        <div className="row">
          <div className="label">Equipments:</div>
        </div>
        <div className="row">
          <ul className="list">
            {equipments.slice(0, 9).map((equipment, index) => {
              return <li key={index}>{equipment}</li>;
            })}
          </ul>
        </div>
      </div>
      <div className="price">Price: {car.price} EUR</div>
      <div className="button-row">
        <div className="button-container">
          <button className="button" onClick={handleClick}>
            Change Color
          </button>
        </div>
        <div className="button-container">
          <label className="favorite-checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            Add to Favorites
          </label>
        </div>
        <div className="button-container">
          {!isInBasket && (
            <button
              className="basket-button"
              onClick={isInBasket ? handleRemoveFromBasket : handleAddToBasket}
            >
              {isInBasket ? "Remove from Basket" : "Add to Basket"}
              <i className="icon fas fa-shopping-cart">🛒</i>
            </button>
          )}
          {isInBasket && (
            <span className="already-in-basket">Already in Basket</span>
          )}
        </div>
      </div>
    </div>
  );
}
