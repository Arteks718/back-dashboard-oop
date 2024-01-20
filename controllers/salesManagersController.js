const createHttpError = require("http-errors");
const _ = require("lodash");
const { SalesManagers } = require("../db/models");

module.exports = {
  getAllSalesManagers: async (req, res, next) => {
    try {
      const listSalesManagers = await SalesManagers.findAll({
        raw: true,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json({ data: listSalesManagers });
    } catch (error) {
      next(error);
    }
  },
  getSalesManagerById: async (req, res, next) => {
    const { salesManagerId } = req.params;
    console.log(salesManagerId)
    try {
      const salesManagerById = await SalesManagers.findByPk(salesManagerId, {
        raw: true,
        attributes: { exclude: ["updatedAt"] },
      });
      if (!salesManagerById) {
        return next(createHttpError(404, "Sales manager not found"));
      }
      res.status(200).json({data: salesManagerById})
    } catch (error) {
      next(error);
    }
  },
  createSalesManager: async (req, res, next) => {
    const { body } = req;
    try {
      const createdSalesManager = await SalesManagers.create(body);
      if (!createdSalesManager) {
        return next(createHttpError(500, "Server Error"));
      }
      const preparedResponse = _.omit(createdSalesManager.get(), ["updatedAt"]);
      res.status(201).json({ data: preparedResponse });
    } catch (error) {
      next(error);
    }
  },
  updateSalesManagerById: async (req, res, next) => {
    const { params: { salesManagerId }, body } = req;
    try {
      const [, [updatedSalesManager]] = await SalesManagers.update(body, {
        where: {
          id: salesManagerId,
        },
        raw: true,
        attributes: { exclude: ["updatedAt"] },
        returning: true
      })
      if(!updatedSalesManager) {
        return next(createHttpError(404, "Sales manager not found"))
      }
      res.status(200).json({ data: updatedSalesManager })
    } catch (error) {
      next(error)
    }
  },
  deleteSalesManagerById: async (req, res, next) => {
    const { params: { salesManagerId } } = req;
    try {
      const deletedSalesManager = await SalesManagers.destroy({
        where: {
          id: salesManagerId
        }
      })
      if(!deletedSalesManager) {
        return next(createHttpError(404, "Sales manager not deleted"))
      }
      res.status(200).end();
    } catch (error) {
      next(error)
    }
  }
};
