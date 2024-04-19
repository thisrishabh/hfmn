import dbConnect, { isCollectionExists } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { URLSearchParams } from "url";

export const GET = async (req: NextRequest, res, ...other) => {
    try {
        await dbConnect();
        // const { page = 1, limit = 10 } = ;
        const collection = req.url.includes("?") ? req.url.split("?")[0].split("/").pop() || "" : req.url.split("/").pop() || "";
        // add check to see if the collection exists
        if (!isCollectionExists(collection))
            return new NextResponse("Collection not found", { status: 404 });

        const searchParams = new URLSearchParams(req.nextUrl.searchParams);
        const page = parseInt(searchParams.get("page")) || 0;
        const limit = parseInt(searchParams.get("limit")) || 0;
        let data = [];
        if (page && limit) {
            const skip = (page - 1) * limit;
            data = await mongoose.connection.db.collection(collection).find({}).skip(skip).limit(limit).toArray();
        } else
            data = await mongoose.connection.db.collection(collection).find({}).toArray();

        return NextResponse.json(data)
    } catch (error) {
        return new NextResponse("Error in fetching the data" + error)
    }
}