const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PaymentSchema = new Schema({
    amount: {
    type: String,
    required: true
  },
  balance_transaction: {
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  receipt_url: {
    type: String,
    required: true
  },
  
  timestamp: {
    type: Date,
    default: Date.now,
  },


});

module.exports = Payment = mongoose.model("payments", PaymentSchema);
