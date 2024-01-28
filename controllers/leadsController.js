const createHttpError = require("http-errors");
const _ = require("lodash");
const { Leads } = require("../db/models");

module.exports = {
  getAllLeads: async (req, res, next) => {
    const { leadsFilter } = req.query;
    try {
      let listLeads;
      if (leadsFilter == "all") {
        listLeads = await Leads.findAll({
          raw: true,
          order: [
            ['id', 'ASC']
          ]
        });
      } else {
        listLeads = await Leads.findAll({
          where: {
            status: leadsFilter,
          },
          raw: true,
        });
      }

      if (!listLeads) {
        return next(createHttpError(404, "List of leads is empty"));
      }
      res.status(200).json({ data: listLeads });
    } catch (error) {
      next(error);
    }
  },
  getLeadById: async (req, res, next) => {
    const { leadId } = req.params;
    try {
      const leadById = await Leads.findByPk(leadId, {
        raw: true,
      });
      if (!leadById) {
        return next(createHttpError(404, "Lead not found"));
      }
      res.status(200).json({ data: leadById });
    } catch (error) {
      next(error);
    }
  },
  getLeadsBySalesManager: async (req, res, next) => {
    const { salesManagerId } = req.params;
    try {
      const leadsBySalesManagerId = await Leads.findAll({
        where: {
          salesManagerId,
        },
        attributes: {
          exclude: ["salesManagerId"],
        },
      });
      res.status(200).json({ data: leadsBySalesManagerId });
    } catch (error) {
      next(error);
    }
  },
  createLead: async (req, res, next) => {
    const { body } = req;
    try {
      const createdLead = await Leads.create(body);
      if (!createdLead) {
        return next(createHttpError(500, "Server Error"));
      }
      const preparedResponse = _.omit(createdLead.get(), ["updatedAt"]);
      res.status(201).json({ data: preparedResponse });
    } catch (error) {
      next(error);
    }
  },
  updateLeadById: async (req, res, next) => {
    const {
      body,
      params: { leadId },
    } = req;
    try {
      console.log("---------------------", body)
      const updatedLead = await Leads.update(body, {
        where: {
          id: leadId,
        },
        raw: true,
        returning: true,
      });
      if (!updatedLead) {
        return next(createHttpError(404, "Lead not found"));
      }
      res.status(201).send({ data: updatedLead });
    } catch (error) {
      next(error);
    }
  },
  deleteLeadById: async (req, res, next) => {
    const { leadId } = req.params;
    try {
      const deletedLead = await Leads.destroy({
        where: {
          id: leadId,
        },
        raw: true,
      });
      if (!deletedLead) {
        return next(createHttpError(404, "Lead not found"));
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
  deleteAllLead: async (req, res, next) => {
    try {
      const deletedLeads = await Leads.destroy({ truncate: true, force: true });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
};
