const express = require("express"); 
const cors = require("cors"); 
require("dotenv").config(); 

const app = express(); 
app.use(cors()); 
app.use(express.json());

//serve frontend
app.use(express.static("public"));

app.get("/", (req, res) => { 
    res.send("API is running"); 
}); 
// mount routers 
app.use("/api/notes", require("./notes/notesRouter"));
app.use("/api/leaderboard", require("./leaderboard/leaderboardRouter"));
app.use("/api/products", require("./products/productsRouter"));

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
