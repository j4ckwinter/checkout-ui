import { Item } from "./item.model";

export interface CheckoutDrawerProps {
  selectedItems: Item[];
  isOpen: boolean;
  onCloseDrawer: () => void;
  onClearBasket: () => void;
}
