import { Router } from "express";

import Controller from "./controller";

const router = Router();

router.get("/", Controller.getRandomQuote);
router.post("/", Controller.createQuote);

export default router;
