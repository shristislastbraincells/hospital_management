const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const nurseRoutes = require("./routes/nurseRoutes");
const receptionistRoutes = require("./routes/receptionistRoutes");
const roomRoutes = require("./routes/roomRoutes");
const billRoutes = require("./routes/billRoutes");
const testReportRoutes = require("./routes/testReportRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/employees", employeeRoutes);
app.use("/nurses", nurseRoutes);
app.use("/receptionists", receptionistRoutes);
app.use("/rooms", roomRoutes);
app.use("/bills", billRoutes);
app.use("/testreports", testReportRoutes);

// start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});