import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";

//it's a server component i've to destructure the params
const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await prismadb.size.findUnique({
    where: { id: params.sizeId },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};
export default SizePage;
