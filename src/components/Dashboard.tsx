import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import Header from "./Header";
import ItemList from "./ItemList";
import { Item } from "../model/item.model";
import CheckoutDrawer from "./CheckoutDrawer";
import { Button, Alert } from "@mui/material";
import { ItemService } from "../service/item.service";

const Dashboard: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [addedItem, setAddedItem] = useState<Item | null>(null);

  useEffect(() => {
    ItemService.getItems().subscribe(
      (data) => {
        setItems(data);
      },
      (error) => {
        console.error("Error fetching items:", error);
      }
    );
  }, []);

  const handleAddToBasket = (item: Item) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
    setAddedItem(item);
    console.log(`Item ${item.name} added to basket!`);
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleClearBasket = () => {
    setSelectedItems([]);
  };

  const handleAlertClose = () => {
    setAddedItem(null);
  };

  return (
    <>
      <Header />
      {addedItem && (
        <Alert
          severity="success"
          onClose={handleAlertClose}
          sx={{
            margin: "16px",
            justifyContent: "center",
            display: "flex",
            padding: "12px",
          }}
        >
          {addedItem.quantity} {addedItem.name} added to basket!
        </Alert>
      )}
      <Box sx={{ justifyContent: "center", margin: "0 auto" }}>
        <ItemList items={items} onAddToBasket={handleAddToBasket} />
      </Box>
      <CheckoutDrawer
        selectedItems={selectedItems}
        isOpen={isDrawerOpen}
        onCloseDrawer={handleCloseDrawer}
        onClearBasket={handleClearBasket}
      />
      <Box sx={{ textAlign: "right", margin: "0 auto" }}>
        <Button
          style={{ height: "56px", width: "150px", marginRight: "15px" }}
          variant="contained"
          color="success"
          onClick={handleOpenDrawer}
        >
          Open Basket
        </Button>
      </Box>
    </>
  );
};

export default Dashboard;
