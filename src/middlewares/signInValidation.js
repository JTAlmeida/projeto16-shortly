import joi from "joi";

export default function signInValidation(req, res, next) {
  const { name, email, password, confirmPassword } = req.body;

  const validation = joi
    .object({
      name: joi.string().required().max(150),
      email: joi.string().email().required().max(100),
      password: joi.string().required(),
      confirmPassword: joi.string().required().valid(joi.ref("password")),
    })
    .validate(
      { name, email, password, confirmPassword },
      { abortEarly: false }
    );

  if (validation.error) {
    const err = validation.error.details.map((error) => {
      return error.message;
    });
    return res.status(422).send({ message: err });
  }

  next();
}
