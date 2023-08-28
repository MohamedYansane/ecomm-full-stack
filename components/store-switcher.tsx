"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Store as StoreIcon, KeyboardArrowDown } from "@mui/icons-material";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;
interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}
export const StoreSwitcher = ({
  className,
  items = [],
}: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  //let format our items cause we gonna iterate through them
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  //we've to check all the store the user has and what is the active store
  //and wchich one we show as selected store
  //we're comparing the item.value to the params.storeId which is in the url
  //and come from [storeId] if it's equal it means it the selected store
  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );
  const [open, setOpen] = useState(false);
  // a function that gonna trigger
  //store it thas the the type of formattedItems
  //but we gonna destructure it
  const onStoreSelect = (store: { label: string; value: string }) => {
    // the setOpen(false) gonna close the store switch once a store is selected
    setOpen(false);
    router.push(`/${store.value}`);
    //and here we gonna redirect to the store / id but with the new one
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4 " />
            {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store ..." />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
