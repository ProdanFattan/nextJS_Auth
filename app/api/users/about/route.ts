import connect from "@/dbConfig/dbConnect";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    //extract data from token
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
