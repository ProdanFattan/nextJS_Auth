import connect from "@/dbConfig/dbConnect";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    //extract data from token
    const userId = await getDataFromToken(request);
    const user = await UserModel.findOne({ _id: userId }).select("-password");
    if (!user) {
      return new NextResponse("Invalid token", { status: 400 });
    }
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
