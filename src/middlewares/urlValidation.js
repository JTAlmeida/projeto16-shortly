import joi from "joi";
const urlPattern = new RegExp(
  "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
);

export default async function urlValidation(req, res, next) {
  const { url } = req.body;

  const validation = joi
    .object({
      url: joi.string().regex(urlPattern).required(),
    })
    .validate({ url }, { abortEarly: false });

  if (validation.error) {
    const err = validation.error.details.map((error) => {
      return error.message;
    });
    return res.status(422).send({ message: err });
  }
  
  next();
}
