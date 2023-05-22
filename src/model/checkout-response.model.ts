import { Item } from "./item.model";

export interface CheckoutResponse {
  items: Item[];
  cost: number;
  success: boolean;
}
