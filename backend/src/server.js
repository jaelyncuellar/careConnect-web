import dotenv from "dotenv"; 
dotenv.config();

import express from "express"; 
import cors from "cors"; 

import attendanceRouter from "./features/attendance/attendance.router.js";
import careGoalsRouter from "./features/careGoals/careGoals.router.js"; 
import careObservationsRouter from "./features/careObservations/careObservations.router.js"; 
import carePlansRouter from "./features/carePlans/carePlans.router.js"; 
import clientNotesRouter from "./features/clientNotes/clientNotes.router.js"; 
import clientsRouter from "./features/clients/clients.router.js"; 
import clientTasksRouter from "./features/clientTasks/clientTasks.router.js"; 
import housesRouter from "./features/houses/houses.router.js"; 
import schedulesRouter from "./features/schedules/schedules.router.js"; 
import staffRouter from "./features/staff/staff.router.js"; 
import taskCompletionsRouter from "./features/taskCompletions/taskCompletions.router.js";
import taskDefinitionsRouter from "./features/taskDefinitions/taskDefinitions.router.js";

const app = express(); 

app.use(cors()); 
app.use(express.json());

// mount routers 
app.use("/attendance", attendanceRouter);
app.use("/careGoals", careGoalsRouter);
app.use("/careObservations", careObservationsRouter);
app.use("/carePlans", carePlansRouter);
app.use("/clientNotes", clientNotesRouter);
app.use("/clients", clientsRouter);
app.use("/clientTasks", clientTasksRouter);
app.use("/houses", housesRouter);
app.use("/schedules",schedulesRouter);
app.use("/staff", staffRouter);
app.use("/taskCompletions", taskCompletionsRouter);
app.use("/taskDefinitions", taskDefinitionsRouter);

// root route 
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

console.log("all routers mounted!"); 

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
