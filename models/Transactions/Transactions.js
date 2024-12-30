import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  accountNumber: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
});

const transactionModel = mongoose.model(
  "transactions",
  transactionSchema,
  "transactions"
);

export default transactionModel;
