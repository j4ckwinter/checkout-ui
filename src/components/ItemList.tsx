import React, { useState } from "react";
import { List, ListItem, ListItemText, Button, TextField } from "@mui/material";
import { Item } from "../model/item.model";
import { ItemListProps } from "../model/item-list-props";

const ItemList: React.FC<ItemListProps> = ({ items, onAddToBasket }) => {
  const [quantities, setQuantities] = useState<number[]>(
    Array(items.length).fill(0)
  );

  const handleAddToBasket = (item: Item, index: number) => {
    const quantity = quantities[index];
    onAddToBasket({ ...item, quantity });
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = 0; // Reset the quantity to 0
      return newQuantities;
    });
    console.log(`Item ${item.name} added to basket with quantity ${quantity}!`);
  };

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ) => {
    const value = parseInt(event.target.value);
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = value < 0 ? 0 : value; // Set the new quantity value
      return newQuantities;
    });
  };

  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={item.sku}>
          <ListItemText
            primary={`${item.name}`}
            secondary={`Price: $${item.price.toFixed(2)}`}
          />
          <ListItemText primary={`Remaining Stock: ${item.quantity}`} />
          <TextField
            type="number"
            variant="outlined"
            inputProps={{ min: 0 }}
            label="Quantity"
            value={quantities[index]}
            onChange={(event) => handleQuantityChange(event, index)}
            style={{ marginRight: "8px", width: "85px" }}
          />
          <Button
            style={{ height: "56px", width: "150px" }}
            variant="contained"
            onClick={() => handleAddToBasket(item, index)}
          >
            Add to Basket
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default ItemList;
