import express, { application } from "express";
import config from "config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "../../utils/sendEmail.js";
import sendSMS from "../../utils/sendSMS.js";
import userModel from "../../models/Customers/Customers.js";

const URL = config.get("URL");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let { name, email, password, phone } = req.body;
    //check for duplicate
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists!!!" });
    }
    //hashing password
    let hashPass = await bcrypt.hash(password, 10);
    //generating tokens
    let emailToken = Math.random().toString(36).substring(2);
    let phoneToken = Math.random().toString(36).substring(2);
    console.log(emailToken, phoneToken);
    //storing them in the user
    let newUser = {
      name,
      email,
      password: hashPass,
      phone,
      userVerifiedToken: {
        email: emailToken,
        phone: phoneToken,
      },
    };
    //creating them
    await userModel.create(newUser);
    // //email verification
    // await sendEmail({
    //   to: email,
    //   html: `<p>Verify your email using the link below:</p>
    //   <a href = "${URL}/api/public/verifyemail/${emailToken}">Click on Meeee</a>
    //   `,
    // });
    // //sms verification
    // await sendSMS({
    //   to: phone,
    //   body: `${URL}/api/public/verifyphone/${phoneToken}`,
    // });
    console.log(`${URL}/api/public/emailverify/${emailToken}`);
    console.log(
      `Please verify your phone number using the link below:\n\n${URL}/api/public/phoneverify/${phoneToken}`
    );
    res.status(200).json({ msg: "User registed, Now verify email and phone" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/emailverify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    let user = await userModel.findOne({ "userVerifiedToken.email": token });
    if (!user) {
      return res.status(400).json({ msg: "Invalid token" });
    }
    user.userVerify.email = true;
    user.userVerifiedToken.email = null;
    await user.save();
    res.status(200).json({ msg: "Email verified succesfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/phoneverify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    let user = await userModel.findOne({ "userVerifiedToken.phone": token });
    if (!user) {
      return res.status(400).json({ msg: "Invalid token" });
    }
    user.userVerify.phone = true;
    user.userVerifiedToken.phone = null;
    await user.save();
    res.status(200).json({ msg: "Phone verified succesfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    if (!user.userVerify.email) {
      return res.status(400).json({ msg: "Email not verified" });
    }
    if (!user.userVerify.phone) {
      return res.status(400).json({ msg: "Phone not verified" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials!" });
    }
    let JWT_SECRET = config.get("JWT_SECRET");
    let token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ msg: "User logged in succesfully!", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
