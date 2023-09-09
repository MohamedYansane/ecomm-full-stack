//creating a specific route for ur sizeId
//like we did with storeId
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    //Notice we r using deleteMany cause the userId is not unique
    const size = await prismadb.size.findUnique({
      where: { id: params.sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET_UNIQUE] Error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

//we gonna create to routes the one to update and the second to delete.
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
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
    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }
    //i want to confirm this storeId exist for this us er like he's the owner
    //so it can't steal another user storeId to create a billboard
    const storeByUserId = prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const sizes = await prismadb.size.updateMany({
      where: { id: params.sizeId },
      //and here is the data we wanna update here it's only the name
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZE_PATCH] Error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
//even if we dont use the req but we've to put it there
//cause the params never come to the first position
// it has to be the second argument
export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
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
    const sizes = await prismadb.size.deleteMany({
      where: { id: params.sizeId },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZE_DELETE] Error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
