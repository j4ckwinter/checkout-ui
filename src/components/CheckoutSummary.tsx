import React from "react";
import {
  Typography,
  Paper,
  Box,
  List,
  Button,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckoutResponse } from "../model/checkout-response.model";
import Header from "./Header";

const CheckoutSummaryPage = () => {
  const location = useLocation();
  const response: CheckoutResponse = location.state; // Access the response from the state
  let navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Header />
      <Box display="flex" justifyContent="center">
        <Box maxWidth="800px" width="100%" margin="auto" padding="16px">
          <Typography variant="h4" gutterBottom>
            Checkout Summary
          </Typography>
          <Paper
            elevation={3}
            sx={{ padding: "16px", backgroundColor: "#f5f5f5" }}
          >
            {response ? (
              <>
                <List>
                  {response.items.map((item, index) => (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemText
                        primary={`${item.quantity} ${item.name}`}
                        secondary={item.note && item.note}
                        primaryTypographyProps={{ variant: "h6" }}
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="body1" gutterBottom align="right">
                  Total Price: ${response.cost ? response.cost.toFixed(2) : 0}
                </Typography>
              </>
            ) : (
              <Typography variant="subtitle1" color="error" gutterBottom>
                Error during checkout. Please try again.
              </Typography>
            )}
            <Button
                variant="contained"
                onClick={handleGoBack}
                fullWidth
                sx={{ marginTop: "16px" }}
            >
              Go Back
            </Button>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default CheckoutSummaryPage;
