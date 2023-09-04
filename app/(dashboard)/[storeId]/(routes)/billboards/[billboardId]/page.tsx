import prismadb from "@/lib/prismadb";
import { BillBoardForm } from "./components/billboard-form";

//it's a server component i've to destructure the params
const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prismadb.billboard.findUnique({
    where: { id: params.billboardId },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <BillBoardForm initialData={billboard}/>
      </div>
    </div>
  );
};
export default BillboardPage;
