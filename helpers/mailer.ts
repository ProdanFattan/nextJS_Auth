import UserModel from "@/models/user.model";
import bcryptjs from "bcryptjs";
const nodemailer = require("nodemailer");

export const sendMail = async (
  email: string,
  emailType: string,
  userID: string
) => {
  try {
    const hasedToken = await bcryptjs.hash(userID.toString(), 10);
    if (emailType === "VERIFY") {
      await UserModel.findByIdAndUpdate(userID, {
        verifyToken: hasedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (email === "RESET") {
      await UserModel.findByIdAndUpdate(userID, {
        forgotPasswordToken: hasedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: "prodanfattan@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hasedToken}">here</> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or  copy and paste the link below in your password <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hasedToken}</p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
