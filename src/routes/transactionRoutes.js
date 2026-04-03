const express = require("express");
const router = express.Router();

const {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction
} = require("../controllers/transactionController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// CREATE → only admin
router.post("/", protect, authorizeRoles("admin"), createTransaction);

// READ → analyst + admin
router.get("/", protect, authorizeRoles("admin", "analyst"), getTransactions);

// UPDATE → admin
router.patch("/:id", protect, authorizeRoles("admin"), updateTransaction);

// DELETE → admin
router.delete("/:id", protect, authorizeRoles("admin"), deleteTransaction);

module.exports = router;