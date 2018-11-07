import { Router } from "express";

import { Routes as QuoteRoutes } from "./Quotes";

const componentsRouter = Router();

componentsRouter.use("/quotes", QuoteRoutes);

export default componentsRouter;
