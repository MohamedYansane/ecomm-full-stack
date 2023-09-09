"use client";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

import { useEffect } from "react";
//import { UserButton } from "@clerk/nextjs";
const SetupPage = () => {
  //if i did this const storeModal = useStoreModal();
  //it will work but inside the useEffect it won't
  //so to make it work
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  useEffect(() => {
    //i'm gonna check if the modal is open if not i'm  gonna open
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]); // the array is my dependencies
  return null;
};
export default SetupPage;
