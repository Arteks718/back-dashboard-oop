const { Router } = require("express");
const salesManagersRouter = require("./salesManagersRouter");
const leadsRouter = require("./leadsRouter");

const appRouter = Router();

appRouter.use("/salesManagers", salesManagersRouter);
appRouter.use("/leads", leadsRouter);

module.exports = appRouter;
