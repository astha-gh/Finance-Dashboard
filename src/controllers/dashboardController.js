const Transaction = require("../models/Transaction");

exports.getSummary = async (req, res) => {
    try {

        //Total Income
        const incomeResult = await Transaction.aggregate([
            { $match: { type: "income" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        //Total expense
        const expenseResult = await Transaction.aggregate([
            { $match: { type: "expense" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalIncome = incomeResult[0]?.total || 0;
        const totalExpense = expenseResult[0]?.total || 0;

        //Net Balance
        const netBalance = totalIncome - totalExpense;

        //Category wise totals
        const categoryBreakdown = await Transaction.aggregate([
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            },
            { $sort: { total: -1 } }
        ]);

        //Recent Transactions
        const recentTransactions = await Transaction.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("user", "name email");

        res.json({
            totalIncome,
            totalExpense,
            netBalance,
            categoryBreakdown,
            recentTransactions
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};