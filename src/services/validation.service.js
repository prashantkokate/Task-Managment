const Joi = require('joi'); 
const { handleErrors } = require("../helpers/general.helper") 

const validateTaskCreate = ( req, res, next ) => {
    try {
      const schema = Joi.object({ 
        title: Joi.string().required().messages({
            "string.empty": "Title is required",
        }),
        description: Joi.string().required().messages({
            "string.empty": "Description is required",
        }),
        status: Joi.string().valid("pending", "completed").required().messages({
          "any.only": "Status must be one of pending or completed",
          "string.empty": "Status is required",
        })
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return handleErrors( res, error.details[0].message );
      }
      next();
      } catch (error) {
        next(error)
    }
};

const validateTaskUpdate = ( req, res, next ) => {
  try {
    const paramsSchema = Joi.object({
      id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "string.empty": "ID is required",
            "string.pattern.base": "Invalid ID format. Please provide a valid MongoDB ObjectId.",
          }),
      });
    const schema = Joi.object({ 
      title: Joi.string().required().messages({
          "string.empty": "Title is required",
      }),
      description: Joi.string().required().messages({
          "string.empty": "Description is required",
      }),
      status: Joi.string().valid("pending", "completed").required().messages({
        "any.only": "Status must be one of pending or completed",
        "string.empty": "Status is required",
      })
    });

    const { error: paramsError } = paramsSchema.validate(req.params);
    if (paramsError) {
      return handleErrors( res, paramsError.details[0].message );
    }

    const { error } = schema.validate(req.body);
    if (error) {
      return handleErrors( res, error.details[0].message );
    }
    next();
    } catch (error) {
      next(error)
  }
};

const validateDeleteTask = ( req, res, next ) => {
  try {
    const schema = Joi.object({ 
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message("Invalid id format. Please provide a valid MongoDB ObjectId.")
      .required()
    });
    const { error } = schema.validate(req.params);
    if (error) {
      return handleErrors( res, error.details[0].message );
    }
    next();
    } catch (error) {
      next(error)
  }
};

  module.exports = {
    validateTaskCreate,
    validateTaskUpdate,
    validateDeleteTask, 
  };
