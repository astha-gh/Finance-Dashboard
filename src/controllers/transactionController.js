const Transaction = require("../models/Transaction");

// CREATE
exports.createTransaction = async (req, res) => {
    try {
        const { amount, type, category, date, note } = req.body;

        const transaction = await Transaction.create({
            user: req.user._id,
            amount,
            type,
            category,
            date,
            note
        });

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET (with filters)
exports.getTransactions = async (req, res) => {
    try {
        const { type, category, startDate, endDate } = req.query;

        let filter = {};

        // Role-based data access
        if (req.user.role === "admin" || req.user.role === "analyst") {
            // can see all transactions
            filter = {};
        } else {
            return res.status(403).json({ message: "Access denied" });
        }

        if (type) filter.type = type;
        if (category) filter.category = category;

        if (startDate && endDate) {
            filter.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const transactions = await Transaction.find(filter)
            .populate("user", "name email") // optional but strong signal
            .sort({ date: -1 });

        res.status(200).json(transactions);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json({ message: "Transaction deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};