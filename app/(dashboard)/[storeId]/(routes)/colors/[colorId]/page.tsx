import prismadb from "@/lib/prismadb";
import { ColorForm } from "./components/color-form";

//it's a server component i've to destructure the params
const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  const color = await prismadb.color.findUnique({
    where: { id: params.colorId },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};
export default ColorPage;
