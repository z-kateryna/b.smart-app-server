import express from "express";
import cors from "cors";
import "dotenv/config";
import generalTopicsRoutes from "./routes/generalTopicsRoute.js";
import openAiRoute from "./routes/openAiRoute.js";
import generateFeedRoute from "./routes/openAiRoute.js";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Welcome to the backend server");
});

app.use("/topics", generalTopicsRoutes);

app.use(express.static("public/icons"));

app.use("/api/openai", openAiRoute);
// app.use("/api/feed", generateFeedRoute);

app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
});
