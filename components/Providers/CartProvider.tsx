"use client";

import { store } from "@/app/store/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

interface Props {
  children: ReactNode;
}

const CartProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={"Loading..."} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
export default CartProvider;
