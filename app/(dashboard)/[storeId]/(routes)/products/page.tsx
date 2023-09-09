import { format } from "date-fns";
import { formatter } from "@/lib/utils";

import prismadb from "@/lib/prismadb";
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: { storeId: params.storeId },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: { createdAt: "desc" },
  });
  //to format the date to string i've to install a package  npm i date-fns
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    //i'm going to format my price in nice way for that
    //i've to go inside the lib/utils
    //now i'm gonna wrap the price inside my formatter i imported from utils
    //in our prisma it Decimal so we've to convert to number
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    //i'm gonna get HEX code so that i can display the code
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};
export default ProductsPage;
