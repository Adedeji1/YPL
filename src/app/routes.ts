import { createBrowserRouter } from "react-router";
import { Root } from "./components/root";
import { Home } from "./components/home";
import { Menu } from "./components/menu";
import { PizzaBuilder } from "./components/pizza-builder";
import { Checkout } from "./components/checkout";
import { Success } from "./components/success";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu },
      { path: "builder", Component: PizzaBuilder },
      { path: "checkout", Component: Checkout },
      { path: "success", Component: Success },
    ],
  },
]);
