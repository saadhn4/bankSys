import express from 'express'
import transactionModel from '../../models/Transactions/Transactions.js'

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    let userData = req.body;
    await transactionModel.create(userData);
    res.status(200).json({ msg: "Transaction created", data: userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let transaction = await transactionModel.findOne({ _id: userParams });
    res.status(200).json({ transaction });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getall", async (req, res) => {
  try {
    let transactions = await transactionModel.findOne({});
    res.status(200).json({ transactions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let userData = req.body;
    await transactionModel.updateOne({ _id: userParams }, { $set: userData });
    res.status(200).json({ msg: "Transaction updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    await transactionModel.deleteOne({ _id: userParams });
    res.status(200).json({ msg: "Transaction deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleteall", async (req, res) => {
  try {
    await transactionModel.deleteMany({});
    res.status(200).json({ msg: "All Transactions deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;