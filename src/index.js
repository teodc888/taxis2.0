import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import Store from "./redux/store/index";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";

const { persistor, store } = Store;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Container maxWidth="L">
            <App />
          </Container>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
