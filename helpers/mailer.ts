import UserModel from "@/models/user.model";
import bcryptjs from "bcryptjs";
const nodemailer = require("nodemailer");

export const sendEmail = async ({ email, emailType, userID }: any) => {
  try {
    console.log("hello" + email + "  " + emailType + "  " + userID);

    const hasedToken = await bcryptjs.hash("fattan101010", 10);
    if (emailType === "VERIFY") {
      await UserModel.findByIdAndUpdate(userID, {
        $set: {
          verifyToken: hasedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (email === "RESET") {
      await UserModel.findByIdAndUpdate(userID, {
        $set: {
          forgotPasswordToken: hasedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }
    console.log("hello1");
    // Looking to send emails in production? Check out our Email API/SMTP product!
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "239b363a5a9a06",
        pass: "e1a36f267366f6",
      },
    });
    console.log("hello2");
    const mailOptions = {
      from: "prodanfattan@gmail.com",
      to: email,
      subject: "Verify",
      html: `<p> ${process.env.DOMAIN}/verifyemail?token=${hasedToken}</p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    console.log("hello3");
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
