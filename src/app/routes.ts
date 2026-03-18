import { createBrowserRouter } from "react-router";
import { Root } from "./components/root";
import { Home } from "./components/home";
import { Menu } from "./components/menu";
import { PizzaBuilder } from "./components/pizza-builder";
import { Checkout } from "./components/checkout";
import { Success } from "./components/success";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import Catering from "./components/catering";
import CateringOrderForm from "./components/cateringForm";
import CareersPage from "./components/career";

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
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "catering", Component: Catering },
      { path: "catering/order", Component: CateringOrderForm },
      { path: "career", Component: CareersPage },
    ],
  },
]);
