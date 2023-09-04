import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
    //i'm populating the relation between billboard and category
    include: {
      billboard: true,
    },
    orderBy: { createdAt: "desc" },
  });
  //to format the date to string i've to install a package  npm i date-fns
  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    //ça ne marchera pas comme ca(item.billboard.label) jusqu'à
    //ce qu'on utilise le include au niveau du await
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};
export default CategoriesPage;
