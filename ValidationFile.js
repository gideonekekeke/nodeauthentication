const joi = require("@hapi/joi");

const Register = (data) => {
  const schema = joi.object({
    name: joi.string().required("this field is required"),
    email: joi.string().required("this filed is required").email(),
    password: joi.string().required("must input your password").min(6),
  });
  return schema.validate(data);
};

module.exports.Register = Register;

const Login = (data) => {
  const schema = joi.object({
    email: joi.string().required("this filed is required").email(),
    password: joi.string().required().min(6),
  });

  return schema.validate(data);
};

module.exports.Login = Login;
