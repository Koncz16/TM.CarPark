import React, { useState } from "react";
import useBasketStore from "../state/useBasketStore";
import { Car } from "../../models";
import "./BasketPage.css";

const BasketPage = () => {
  const { basketItems, removeFromBasket } = useBasketStore();
  const [quantities, setQuantities] = useState<{ [vin: string]: number }>({});

  const handleRemoveFromBasket = (car: Car) => {
    removeFromBasket(car);
  };

  const handleQuantityChange = (vin: string, change: number) => {
    const newQuantity = (quantities[vin] || 1) + change;
    if (newQuantity > 0) {
      setQuantities({ ...quantities, [vin]: newQuantity });
    }
  };

  const calculateTotalPrice = (car: Car) => {
    const quantity = quantities[car.vin] || 1;
    return parseFloat(car.price) * quantity;
  };

  const totalPrice = basketItems.reduce(
    (total: number, car: Car) => total + calculateTotalPrice(car),
    0
  );

  return (
    <div className="basket-page">
      <h2>Basket</h2>
      {basketItems.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <>
          <ul className="car-list">
            {basketItems.map((car) => (
              <li key={car.vin} className="car-item">
                <img
                  className="car-image"
                  src={`http://localhost:3019/img/${car.image}`}
                  alt={`${car.manufacturer} ${car.model}`}
                />
                <div className="car-details">
                  <div>
                    <h3>
                      {car.manufacturer} {car.model}
                    </h3>
                    <p>Construction Year: {car.constructionYear}</p>
                    <p>Fuel Type: {car.fuelType}</p>
                    <p>Price: {car.price} EUR</p>
                  </div>
                </div>
                <div className="item-total">
                  Item Total:{" "}
                  <span>{calculateTotalPrice(car).toFixed(2)} EUR</span>
                </div>
                <div className="quantity-controls">
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(car.vin, -1)}
                  >
                    -
                  </button>
                  <span className="quantity">{quantities[car.vin] || 1}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(car.vin, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveFromBasket(car)}
                >
                  Remove from Basket
                </button>
              </li>
            ))}
          </ul>
          <div className="basket-total">
            Total Price: <span>{totalPrice.toFixed(2)} EUR</span>
          </div>
        </>
      )}
    </div>
  );
};

export default BasketPage;
