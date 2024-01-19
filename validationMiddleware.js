// app/validationMiddleware.js
const { body, validationResult } = require('express-validator');

const validationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('age').isInt().withMessage('Age must be an integer'),
    body('status').isIn(['positive', 'recovered', 'dead']).withMessage('Invalid status')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validationRules, validate };