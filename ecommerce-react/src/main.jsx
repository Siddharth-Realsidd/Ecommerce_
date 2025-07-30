import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { Web3ContextProvider } from "./context/Web3Context";
import "../style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Web3ContextProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </Web3ContextProvider>
);
