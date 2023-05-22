import React from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import Dashboard from "./Dashboard";
import CheckoutSummary from "./CheckoutSummary";

const Routes: React.FC = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/checkout-summary" element={<CheckoutSummary />} />
    </RouterRoutes>
  );
};

export default Routes;
