import { DataAPIClient } from "@datastax/astra-db-ts";
import { NextRequest, NextResponse } from "next/server";

//req is short for request
export async function GET(req: NextRequest) {
  const post_type = req.nextUrl.searchParams.get("type");
  const client = new DataAPIClient(process.env.DB_TOKEN ?? "");
  const db = client.db(process.env.DB_URL ?? "", { namespace: "social_media" });

  const collection = db.collection("post_engagements");
  const count = await collection.countDocuments({ post_type }, 100);
  const cursor = collection.find({ post_type }, { sort: { reach: "desc" } });
  const data: {
    [key: string]: {
      likes: number;
      shares: number;
      comments: number;
      reach: number;
    };
  } = {};

  const monthlyData: { [key: string]: string | number }[] = [];
  const topViewed = [];

  for await (const doc of cursor) {
    if (topViewed.length < 5) {
      topViewed.push(doc);
    }

    if (!data[doc.platform]) {
      data[doc.platform] = {
        likes: 0,
        shares: 0,
        comments: 0,
        reach: 0,
      };
    }

    const createdAt = new Date(doc.created_at);

    const index = createdAt.getMonth();
    if (!monthlyData[index]) {
      monthlyData[index] = {};
      monthlyData[index]["month"] = "";
      monthlyData[index]["engagement"] = 0;
      monthlyData[index]["visibility"] = 0;
    }

    monthlyData[index] = {
      month: createdAt.toLocaleString("default", { month: "long" }),
      visibility: +monthlyData[index]["visibility"] + +doc.reach,
      engagement:
        +monthlyData[index]["engagement"] +
        +doc.likes +
        +doc.shares +
        +doc.comments,
    };

    data[doc.platform]["likes"] += Math.round(doc.likes / count);
    data[doc.platform]["shares"] += Math.round(doc.shares / count);
    data[doc.platform]["comments"] += Math.round(doc.comments / count);
    data[doc.platform]["reach"] += Math.round(doc.reach / count);
  }

  return NextResponse.json({ monthlyData, data, topViewed }, { status: 200 });
}
