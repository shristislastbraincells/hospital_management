const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all bills
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Bills");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bills" });
  }
});

// GET one bill by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM Bills WHERE B_ID = ?", [id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Bill not found" });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bill" });
  }
});

module.exports = router;
