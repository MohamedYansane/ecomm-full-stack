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
    const {
      name,
      price,
      isFeatured,
      isArchived,
      categoryId,
      colorId,
      sizeId,
      images,
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
    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }
    //i want to confirm this storeId exist for this us er like he's the owner
    //so it can't steal another user storeId to create a product
    const storeByUserId = prismadb.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        //we can upload many images so
        images: {
          createMany: {
            data: [
              //It specifies that image should be an object
              // with a property url of type string.
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT_POST] Error: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    //our product gonna be heavely used in the front end we wanna add a filter
    const { searchParams } = new URL(req.url);
    //get the category  if it's inside or undefined
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured"); // we dont need undefined here
    //exemple of my filtering test http://localhost:3000/api/cec8ba00-21c0-4194-a2dd-0b3bfdd7fab2/products?colorId=baadfee8-ccf7-4b04-9c1b-b1ec88e61431
    //adding a question mark ?and follow by the name of one of my element
    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        //it gonna have one of them if it's passed like we want to filter
        categoryId,
        colorId,
        sizeId,
        //if is Featured is passed we wanna return true or undefined
        //not false cause it will completly ignored this filter if it's undefined
        isFeatured: isFeatured ? true : undefined,
        isArchived: false, // it gonna be always false we want to load that product
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_GET] Error: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
