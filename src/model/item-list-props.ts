import { Item } from "./item.model";

export interface ItemListProps {
  items: Item[];
  onAddToBasket: (item: Item) => void;
}
