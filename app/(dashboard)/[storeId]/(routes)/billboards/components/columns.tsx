"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string;
  imageUrl: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      console.log("Image URL:", row.original);
      return (
        <img
          src={row.original.imageUrl}
          alt=""
          className="w-10 h-10 rounded-md object-cover"
        />
      );
    },
  },
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },

  {
    header: "Actions",
    // we gonna dynamically render the cell action
    id: "actions",
    //Du fait que je lui passe le row n'a aucun rapport avec
    //shadcn mais plutot tanstack react table
    //Nb: the objet we r passing {row} is refering to the
    //elements inside the type BillboardColumn above
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
