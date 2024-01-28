const { Router } = require("express");
const { salesManagersController } = require("../controllers");

const salesManagersRouter = Router();

salesManagersRouter
  .route("/")
  .get(salesManagersController.getAllSalesManagers)
  .post(salesManagersController.createSalesManager)

salesManagersRouter
  .route("/:salesManagerId")
  .get(salesManagersController.getSalesManagerById)
  .put(salesManagersController.updateSalesManagerById)
  .delete(salesManagersController.deleteSalesManagerById);

module.exports = salesManagersRouter

// module.exports = class SalesManagersRouter {
//   constructor() {
//     this.router = Router();
//     this.salesManagersController = salesManagersController
//   }
//   getAllSalesManagers() {
//     this.router.get("/", this.salesManagersController.prototype.getAllSalesManagers);
//   }
//  }
