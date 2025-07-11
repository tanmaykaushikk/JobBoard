const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const jobRoutes = require("./routes/job.route")
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors());
const PORT = process.env.PORT;

app.use("/auth",authRoutes);
app.use("/job",jobRoutes);

app.listen(PORT,()=>{
    connectDb();
    console.log("server running at port", PORT);
})

