import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

// connection to database
await mongoose.connect();

// create an express app
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


//port listening
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});