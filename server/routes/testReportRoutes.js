const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all reports
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Test_Report");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching test reports" });
  }
});

// GET one report by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM Test_Report WHERE Report_ID = ?", [id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Test report not found" });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching test report" });
  }
});

module.exports = router;
