import roleModel from "@/models/roleModel";
import connectDB from "@/utils/DB/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
      await connectDB();

      const data = await roleModel.find({})


      // Return users, total count, and pagination info
      return NextResponse.json({
        success: true,
        data,
      });

    } catch (error: any) {
      // Handle any errors and return a 500 status
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
