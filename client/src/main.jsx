import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          borderRadius: "14px",
          background: "#141b34",
          color: "#dbe8ff",
          border: "1px solid rgba(162, 180, 255, 0.25)"
        }
      }}
    />
  </React.StrictMode>
);
