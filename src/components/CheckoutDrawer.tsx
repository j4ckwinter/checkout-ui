import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { CheckoutDrawerProps } from "../model/checkout-drawer-props.model";
import { ItemService } from "../service/item.service";
import { useNavigate } from "react-router-dom";
import { CheckoutResponse } from "../model/checkout-response.model";
import { Item } from "../model/item.model";

const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  selectedItems,
  isOpen,
  onCloseDrawer,
  onClearBasket,
}) => {
  let navigate = useNavigate();

  const handleDrawerClose = () => {
    onCloseDrawer();
  };

  // Calculate the total price
  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const updatedItems = selectedItems.reduce((acc: Item[], item) => {
      const existingItemIndex = acc.findIndex(
        (basketItem: Item) => basketItem.sku === item.sku
      );
      if (existingItemIndex !== -1) {
        acc[existingItemIndex].quantity += item.quantity;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    ItemService.checkout({ purchasedItems: updatedItems }).subscribe(
      (response: CheckoutResponse) => {
        console.log("Checkout successful:", response);
        navigate("/checkout-summary", { state: response });
      },
      (error) => {
        console.error("Error during checkout:", error);
        navigate("/checkout-summary", { state: error });
      }
    );
  };

  const handleClearBasket = () => {
    onClearBasket();
  };

  return (
    <Drawer anchor="bottom" open={isOpen} onClose={handleDrawerClose}>
      <Typography variant="h6" sx={{ textAlign: "center", mt: 2, mb: 1 }}>
        Basket
      </Typography>
      <List sx={{ paddingLeft: 2, paddingRight: 2 }}>
        {selectedItems.map((item) => (
          <ListItem key={item.sku} onClick={handleDrawerClose}>
            <ListItemText
              primary={`${item.name} (Quantity: ${item.quantity})`}
              secondary={`Price: $${(item.price * item.quantity).toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography
        variant="body1"
        sx={{ textAlign: "right", mt: 2, fontWeight: "bold", paddingRight: 2 }}
      >
        Total Price: ${totalPrice.toFixed(2)}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 16px",
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleClearBasket}
          sx={{ height: "56px", width: "150px", padding: "12px 24px" }}
        >
          Clear Basket
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleCheckout}
          sx={{ height: "56px", width: "150px", padding: "12px 24px" }}
        >
          Checkout
        </Button>
      </Box>
    </Drawer>
  );
};

export default CheckoutDrawer;
