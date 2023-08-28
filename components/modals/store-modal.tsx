"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal"; //or ../ui/modal but the best way @
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
export const StoreModal = () => {
  const [loading, setLoading] = useState(false);
  //for the loading i want to decide which element has
  //to be disabled once my form is loading(when w r submitting our form )

  //i want to create a schema for my store modal
  const formSchema = z.object({
    name: z.string().min(4, {
      message: "Store name must be at least 4 characters",
    }),
  });
  const storeModal = useStoreModal();
  //or the best way
  const onClose = useStoreModal((state) => state.onClose);
  //so here i want to use useStoreModal value to control
  //my Modal props like isOpen & onClose

  // now let use hook form
  const form = useForm<z.infer<typeof formSchema>>({
    //so let's add resolver so that our form can be validade by zod
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });
  //let write a function that gonna be triggered when we submit
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //Todo  create a store
    //console.log(values);
    try {
      setLoading(true);

      const response = await axios.post("/api/stores", values);
      //toast.success("Store created successfully");
      // so window.location gonna refresh the page automatically.
      // so once the refresh done it gonna be 100% load to the database
      //so that's why i didnt use router from navigation cause
      // i dont want user to have a bad experience like to refresh the page
      //every time and the data can't be ready also and the data wont sync
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="">
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            {/** the balise <form action=""></form> from html */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                //i'm gonna extract the field inside my render prop
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      {/**here {...field}  it's like i'm spreading the value of value
                       * so i want handle onChange ref and name etc
                       */}
                      <Input
                        placeholder="Ecommerce"
                        {...field}
                        disabled={loading}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" onClick={onClose} disabled={loading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
//i want to add this to the layout of my application
//and to be available throughout my app whether i triggered it from the product page
//or wherever
// so i'm going to create a providers folder etc
