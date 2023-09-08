//creating a specific route for ur productId
//like we did with storeId
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("product ID is required", { status: 400 });
    }

    //Notice we r using deleteMany cause the userId is not unique
    const product = await prismadb.product.findUnique({
      where: { id: params.productId },
      include: { images: true, category: true, size: true, color: true },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET_UNIQUE] Error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

//we gonna create to routes the one to update and the second to delete.
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      images,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
    } = body;

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("ImageUrl is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("categoryId is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("categoryId is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("colorId is required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("images is required", { status: 400 });
    }
    // we won't check for is Archived or isFeatured
    //cause it has a default value false so if it didnt set
    //it means it values is false
    if (!params.productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }
    //i want to confirm this storeId exist for this us er like he's the owner
    //so it can't steal another user storeId to create a product
    const storeByUserId = prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await prismadb.product.update({
      where: { id: params.productId },
      //and here is the data we wanna update here it's only the name
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });
    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH] Error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
//even if we dont use the req but we've to put it there
//cause the params never come to the first position
// it has to be the second argument
export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }
    //i want to confirm this storeId exist for this us er like he's the owner
    //so it can't steal another user storeId to create a product
    const storeByUserId = prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    //Notice we r using deleteMany cause the userId is not unique
    const products = await prismadb.product.deleteMany({
      where: { id: params.productId },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_DELETE] Error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
