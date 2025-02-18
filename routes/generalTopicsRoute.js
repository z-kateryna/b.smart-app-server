import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (req,res) => {
    try {
        const data = fs.readFileSync("./data/general-topics.json", "utf-8");
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        res.status(200).json(parsedData);
    } catch(error) {
        console.error("error gettinf topics", error);
        res.status(500).json({ error: error });
    }
});

export default router;