"use client";
import { StoreModal } from "@/components/modals/store-modal";

import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <StoreModal />
    </>
  );
  //i'm gonna use that on my layout file but it server rendering
  //so to avoid hydrate error so i'm gonna tell tant que is not isMounted is false
  //like return null it'll be server side but if isMounted the useEffect take place
  //like it will be client side
  //NB: it's the way to handle hydrate error like in my modal but there i use dynamic
};
