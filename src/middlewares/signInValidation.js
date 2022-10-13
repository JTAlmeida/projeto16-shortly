import joi from "joi";

export default function signInValidation(req, res, next) {
  const { email, password } = req.body;

  const validation = joi
    .object({
      email: joi.string().email().required().max(100),
      password: joi.string().required(),
    })
    .validate(
      { email, password },
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
