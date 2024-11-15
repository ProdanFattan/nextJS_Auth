import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decoded.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
