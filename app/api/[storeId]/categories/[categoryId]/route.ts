//creating a specific route for ur categoryId
//like we did with storeId
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    //Notice we r using deleteMany cause the userId is not unique
    const category = await prismadb.category.findUnique({
      where: { id: params.categoryId },
      include:{
        billboard:true
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET_UNIQUE] Error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

//we gonna create to routes the one to update and the second to delete.
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }
    const body = await req.json();
    const { name, billboardId } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }
    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }
    //i want to confirm this storeId exist for this us er like he's the owner
    //so it can't steal another user storeId to create a category
    const storeByUserId = prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const categories = await prismadb.category.updateMany({
      where: { id: params.categoryId },
      //and here is the data we wanna update here it's only the name
      data: {
        name,
        billboardId,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORY_PATCH] Error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
//even if we dont use the req but we've to put it there
//cause the params never come to the first position
// it has to be the second argument
export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }
    //i want to confirm this storeId exist for this us er like he's the owner
    //so it can't steal another user storeId to create a category
    const storeByUserId = prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    //Notice we r using deleteMany cause the userId is not unique
    const categories = await prismadb.category.deleteMany({
      where: { id: params.categoryId },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORY_DELETE] Error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
