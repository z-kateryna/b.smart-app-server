import express from "express";
import { processUserChoice } from "../controllers/data-controller.js";

const router = express.Router();

router.post("/", processUserChoice);

export default router;