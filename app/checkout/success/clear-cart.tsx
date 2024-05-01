"use client";

import { clearCart } from "@/app/store/features/cartSlice";
import { useAppDispatch } from "@/app/store/store";
import { useEffect } from "react";

const ClearCart = () => {

  const dispatch = useAppDispatch();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {

    dispatch(clearCart());

  }, []);

  return null;
};
export default ClearCart;
