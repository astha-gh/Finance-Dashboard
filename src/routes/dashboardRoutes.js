const express = require("express");
const router = express.Router();

const { getSummary } = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

//All roles can view summary
router.get("/summary", protect, authorizeRoles("admin", "analyst", "viewer"), getSummary);

module.exports = router;