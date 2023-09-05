"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    //we want to make colors more cool
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.value}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        ></div>
      </div>
    ),
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
    //elements inside the type ColorColumn above
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
