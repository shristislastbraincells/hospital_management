const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all rooms
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Rooms");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching rooms" });
  }
});

// GET room by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM Rooms WHERE R_ID = ?", [id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Room not found" });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching room" });
  }
});

module.exports = router;
