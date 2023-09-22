import prismadb from "@/lib/prismadb";

export const getSalesCount = async (storeId: string) => {
  //fetch all orders that has been validated by stripe
  const salesCount = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return salesCount;
};
