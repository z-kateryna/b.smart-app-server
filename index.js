import express from "express";
import cors from "cors";
import "dotenv/config";
import generalTopicsRoutes from "./routes/generalTopicsRoute.js";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Welcome to the backend server");
});

app.use(express.static("public/icons"));

app.use("/topics", generalTopicsRoutes);

app.use(express.static("public/icons"));

app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
});
