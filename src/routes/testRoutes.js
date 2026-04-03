const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get(
    "/admin-only",
    protect,
    authorizeRoles("admin"),
    (req, res) => {
        res.json({ message: "Welcome Admin" });
    }
);

router.get(
    "/analyst",
    protect,
    authorizeRoles("admin", "analyst"),
    (req, res) => {
        res.json({ message: "Welcome Analyst/Admin" });
    }
);

module.exports = router;