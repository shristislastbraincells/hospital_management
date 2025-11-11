const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all doctors (joined with employee table)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT e.E_ID, e.Name, e.Salary, e.State, e.City, e.Pin_No,
             d.Dept, d.Qualification
      FROM Employee e
      JOIN Doctor d ON e.E_ID = d.E_ID
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching doctors" });
  }
});

// GET one doctor by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT e.E_ID, e.Name, e.Salary, e.State, e.City, e.Pin_No,
             d.Dept, d.Qualification
      FROM Employee e
      JOIN Doctor d ON e.E_ID = d.E_ID
      WHERE e.E_ID = ?
    `, [id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Doctor not found" });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching doctor" });
  }
});

// POST new doctor (insert into both Employee and Doctor)
router.post("/", async (req, res) => {
  const { Name, Salary, State, City, Pin_No, Dept, Qualification } = req.body;

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Insert into Employee
    const [employeeResult] = await connection.query(
      "INSERT INTO Employee (Name, Salary, State, City, Pin_No) VALUES (?, ?, ?, ?, ?)",
      [Name, Salary, State, City, Pin_No]
    );
    const eId = employeeResult.insertId;

    // Insert into Doctor
    await connection.query(
      "INSERT INTO Doctor (E_ID, Dept, Qualification) VALUES (?, ?, ?)",
      [eId, Dept, Qualification]
    );

    await connection.commit();
    res.status(201).json({ message: "Doctor added successfully!", E_ID: eId });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: "Error adding doctor" });
  } finally {
    connection.release();
  }
});

module.exports = router;
