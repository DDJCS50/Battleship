import { shipFactory } from "./ship.js";

let shipOne = shipFactory(3, 0, false);
shipOne.hit(shipOne);
shipOne.hit(shipOne);
shipOne.hit(shipOne);
