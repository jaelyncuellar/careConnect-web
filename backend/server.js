import express from "express"; 
import cors from "cors"; 
import "dotenv/config"; 

import attendanceRouter from "./attendance/attendanceRouter.js"; 
import carePlansRouter from "./care-plans/carePlansRouter.js"; 
import tasksRouter from "./tasks/tasksRouter.js"; 

const app = express(); 
app.use(cors()); 
app.use(express.json());

//serve frontend from root folder 
app.use(express.static("../public"));

// mount routers 
app.use("/api/attendance", attendanceRouter);
app.use("/api/care-plans", carePlansRouter);
app.use("/api/tasks", tasksRouter);

console.log("Care-plans router mounted");
console.log("Tasks router mounted");

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
