"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
interface ModalPops {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalPops> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}) => {
  //i'm tested the isMounted and it works
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    } else {
      console.log("it's Opened");
    }
  };

  return (
    /*<Dialog onOpenChange={onChange} open={isOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DynamicDialogContent>
        <DialogHeader>
          <DialogTitle>{title} Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers. {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DynamicDialogContent>
    </Dialog>*/
    <Dialog onOpenChange={onChange} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
