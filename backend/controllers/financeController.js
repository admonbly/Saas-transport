const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
  const newTransaction = new Transaction(req.body);
  await newTransaction.save();
  res.status(201).send(newTransaction);
};

exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find();
  res.status(200).send(transactions);
};
