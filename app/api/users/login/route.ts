import connect from "@/dbConfig/dbConnect";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return new NextResponse("Check your credentials", { status: 400 });
    }
    //jwt token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });
    const response = NextResponse.json({
      message: "Logged In Success",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
