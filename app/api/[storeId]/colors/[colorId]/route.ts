//creating a specific route for ur colorId
//like we did with storeId
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
    }

    //Notice we r using deleteMany cause the userId is not unique
    const color = await prismadb.color.findUnique({
      where: { id: params.colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET_UNIQUE] Error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

//we gonna create to routes the one to update and the second to delete.
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }
    const body = await req.json();
    const { name, value } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }
    if (!params.colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
    }
    //i want to confirm this storeId exist for this us er like he's the owner
    //so it can't steal another user storeId to create a billboard
    const storeByUserId = prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const colors = await prismadb.color.updateMany({
      where: { id: params.colorId },
      //and here is the data we wanna update here it's only the name
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLOR_PATCH] Error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
//even if we dont use the req but we've to put it there
//cause the params never come to the first position
// it has to be the second argument
export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    if (!params.colorId) {
      return new NextResponse("COLOR ID is required", { status: 400 });
    }
    //i want to confirm this storeId exist for this us er like he's the owner
    //so it can't steal another user storeId to create a billboard
    const storeByUserId = prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    //Notice we r using deleteMany cause the userId is not unique
    const colors = await prismadb.color.deleteMany({
      where: { id: params.colorId },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLOR_DELETE] Error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
