import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "../node_modules/bootstrap-scss/bootstrap.scss";
import "./index.css";

import App from "./App";
import { store } from "./redux/search/store";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div
              style={{
                color: "white",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              Loading...
            </div>
          }
        >
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
