// kosarStore.ts
import create from "zustand";
import { Car } from "../../models/index";

type State = {
  basketItems: Car[];
  addToBasket: (car: Car) => void;
  removeFromBasket: (car: Car) => void;
};

const useBasketStore = create<State>((set) => ({
  basketItems: JSON.parse(sessionStorage.getItem("basketItems") || "[]"),

  addToBasket: (car: Car) =>
    set((state) => {
      const updatedBasket = [...state.basketItems, car];
      sessionStorage.setItem("basketItems", JSON.stringify(updatedBasket));
      return { basketItems: updatedBasket };
    }),

  removeFromBasket: (car: Car) =>
    set((state) => {
      const updatedBasket = state.basketItems.filter(
        (item) => item.vin !== car.vin
      );
      sessionStorage.setItem("basketItems", JSON.stringify(updatedBasket));
      return { basketItems: updatedBasket };
    }),
}));

export default useBasketStore;
