import express from "express"; 
import cors from "cors"; 
import "dotenv/config"; 

import attendanceRouter from "./routes/attendanceRouter.js"; 
import carePlansRouter from "./routes/carePlansRouter.js"; 
import tasksRouter from "./routes/tasksRouter.js"; 

const app = express(); 
app.use(cors()); 
app.use(express.json());
//serve frontend from root folder 
app.use(express.static("../frontend"));

// mount routers 
app.use("/attendance", attendanceRouter);
app.use("/carePlans", carePlansRouter);
app.use("/tasks", tasksRouter);

// / root route 
app.get("/", (req, res) => {
  res.send("Backend is running!");
});


console.log("Attendance router mounted");
console.log("CarePlans router mounted");
console.log("Tasks router mounted");

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
