const { Router } = require('express');
const { leadsController } = require("../controllers")

const leadsRouter = Router()

leadsRouter
  .route("/")
  .get(leadsController.getAllLeads)
  .post(leadsController.createLead)
  .delete(leadsController.deleteAllLead)

leadsRouter
  .route("/:leadId")
  .get(leadsController.getLeadById)
  .put(leadsController.updateLeadById)
  .delete(leadsController.deleteLeadById)

leadsRouter.get("/:salesManagerId/salesManagers", leadsController.getLeadsBySalesManager)

module.exports = leadsRouter