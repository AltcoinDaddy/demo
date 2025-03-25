import { NextRequest, NextResponse } from "next/server";
import {
  searchCollections,
  getCollection,
  getCollectionItems,
} from "@/lib/chainbase";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get("action");

  try {
    switch (action) {
      case "search": {
        const query = searchParams.get("query") || "";
        const chainId = parseInt(searchParams.get("chainId") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        const result = await searchCollections(query, chainId, limit);
        return NextResponse.json(result);
      }

      case "collection": {
        const address = searchParams.get("address");
        const chainId = parseInt(searchParams.get("chainId") || "1");

        if (!address) {
          return NextResponse.json(
            { error: "Address is required" },
            { status: 400 }
          );
        }

        const collection = await getCollection(address, chainId);
        return NextResponse.json(collection);
      }

      case "collectionItems": {
        const address = searchParams.get("address");
        const limit = parseInt(searchParams.get("limit") || "20");
        const offset = parseInt(searchParams.get("offset") || "0");
        const chainId = parseInt(searchParams.get("chainId") || "1");

        if (!address) {
          return NextResponse.json(
            { error: "Address is required" },
            { status: 400 }
          );
        }

        const items = await getCollectionItems(address, limit, offset, chainId);
        return NextResponse.json(items);
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
