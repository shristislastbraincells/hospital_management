const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all employees
// router.get("/", async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM Employee");
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error fetching employees" });
//   }
// });
router.get("/", async (req, res) => {
  try {
    console.log("GET /employees called");
    const [rows] = await db.query("SELECT * FROM Employee");
    console.log("Query successful:", rows);
    res.json(rows);
  } catch (error) {
    console.error("SQL Error:", error.sqlMessage || error);
    res.status(500).json({ message: "Error fetching employees" });
  }
});


// GET one employee by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM Employee WHERE E_ID = ?", [id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Employee not found" });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching employee" });
  }
});

// POST add new employee
router.post("/", async (req, res) => {
  const { Name, Salary, State, City, Pin_No } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO Employee (Name, Salary, State, City, Pin_No) VALUES (?, ?, ?, ?, ?)",
      [Name, Salary, State, City, Pin_No]
    );
    res.status(201).json({ message: "Employee added successfully!", E_ID: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding employee" });
  }
});

// PUT update employee
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { Name, Salary, State, City, Pin_No } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE Employee SET Name=?, Salary=?, State=?, City=?, Pin_No=? WHERE E_ID=?",
      [Name, Salary, State, City, Pin_No, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating employee" });
  }
});

// DELETE employee
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM Employee WHERE E_ID=?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting employee" });
  }
});

module.exports = router;
