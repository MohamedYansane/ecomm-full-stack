import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

//it's a server component i've to destructure the params
const CategoriesPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await prismadb.category.findUnique({
    where: { id: params.categoryId },
  });
  //in order to populate  our  select inside categoryForm
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};
export default CategoriesPage;
