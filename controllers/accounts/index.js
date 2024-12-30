import express from "express";
import accountModel from "../../models/Accounts/Accounts.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    let userData = req.body;
    await accountModel.create(userData);
    res.status(200).json({ msg: "Account created", data: userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let account = await accountModel.findOne({ _id: userParams });
    res.status(200).json({ account });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getall", async (req, res) => {
  try {
    let accounts = await accountModel.findOne({});
    res.status(200).json({ accounts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let userData = req.body;
    await accountModel.updateOne({ _id: userParams }, { $set: userData });
    res.status(200).json({ msg: "Account updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    await accountModel.deleteOne({ _id: userParams });
    res.status(200).json({ msg: "Account deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleteall", async (req, res) => {
  try {
    await userModel.deleteMany({});
    res.status(200).json({ msg: "All Account deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
