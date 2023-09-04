"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
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
    //shadcn mais plutot tanstack ract table
    //Nb: the objet we r passing {row} is refering to the
    //elements inside the type BillboardColumn above
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
