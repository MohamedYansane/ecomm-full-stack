import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    //getting userId from clerk like the user who's authenticated
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const body = await req.json();
    const { name, value } = body;
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("value is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }
    //i want to confirm this storeId exist for this us er like he's the owner
    //so it can't steal another user storeId to create a billboard
    const storeByUserId = prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const size = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("COLOR_POST] Error: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_GET] Error: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
