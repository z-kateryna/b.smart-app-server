import express from "express";
import { processUserChoice } from "../controllers/data-controller.js";
import { processUserSubtopicChoice } from "../controllers/data-controller.js";

const router = express.Router();

router.post("/", processUserChoice);
router.post("/feed", processUserSubtopicChoice);

export default router;