import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

const accountModel = mongoose.model("accounts", accountSchema, "accounts")

export default accountModel
