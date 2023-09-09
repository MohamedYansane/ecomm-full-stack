import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

//it's a server component i've to destructure the params
const ProductPage = async ({
  params,
}: {
  params: { productId: string, storeId:string };
}) => {
  //we r adding storeId cause all our parents is inside it
  //here we 've a relationship between the product and the image
  const product = await prismadb.product.findUnique({
    where: { id: params.productId },
    //here we r getting array of images and here we dont wan to fetch image id  but url
    include: { images: true }, // dans le model Product ce nest pas image mais images
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  );
};
export default ProductPage;
