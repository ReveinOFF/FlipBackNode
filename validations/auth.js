import { body } from "express-validator";

export const registerValidator = [
  body("email").isEmail().not().isEmpty(),
  body("login")
    .not()
    .isEmpty()
    .isLength({ min: 5, max: 15 })
    .matches(/^[a-zA-Z0-9-._!]{5,15}$/),
  body("name").not().isEmpty().isLength({ max: 15 }),
  body("phoneNumber")
    .not()
    .isEmpty()
    .isLength({ min: 9, max: 15 })
    .matches(/^([\+]{1}[0-9]{1,3}?)[0-9]{9}$/),
  body("password").not().isEmpty().isLength({ min: 8, max: 15 }),
];

export const loginValidator = [
  body("login").not().isEmpty(),
  body("password").not().isEmpty(),
];
