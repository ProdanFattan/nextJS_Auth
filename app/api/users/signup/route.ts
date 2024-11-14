import connect from "@/dbConfig/dbConnect";
import UserModel from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;
    //validation
    const user = await UserModel.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        {
          status: 200,
        }
      );
    }
    //salt generate
    const salt = await bcryptjs.genSalt(10);
    //hash password
    const hashedPassword = await bcryptjs.hash(password, salt);
    const savedUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    const newUser = await savedUser.save();

    //send verification email
    await sendMail({
      email: email,
      emailType: "VERIFY",
      userID: newUser._id,
    });
    return NextResponse.json({
      message: "user registered successsfullt",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
