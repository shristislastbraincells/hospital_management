const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all patients
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Patient");
    res.json(rows);
  } catch (error) {
    console.error("SQL Error:", error);
    res.status(500).json({ message: "Error fetching patients" });
  }
});

// GET one patient by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM Patient WHERE P_ID = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Patient not found" });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching patient" });
  }
});

// POST add new patient
router.post("/", async (req, res) => {
  const { Name, Age, Gender, DOB, Mob_No, Address } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO Patient (Name, Age, Gender, DOB, Mob_No, Address) VALUES (?, ?, ?, ?, ?, ?)",
      [Name, Age, Gender, DOB, Mob_No, Address]
    );
    res.status(201).json({ message: "Patient added successfully!", patientId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding patient" });
  }
});

module.exports = router;
