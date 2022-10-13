import joi from "joi";

export default function signUpValidation(req, res, next) {
  const { name, email, password } = req.body;

  const validation = joi
    .object({
      name: joi.string().required().max(150),
      email: joi.string().email().required().max(100),
      password: joi.string().required(),
    })
    .validate({ name, email, password }, { abortEarly: false });

  if (validation.error){
    const err = validation.error.details.map((error)=>{
        return error.message;
    });
    return res.status(422).send({message: err});
  };
  
  next();
}
