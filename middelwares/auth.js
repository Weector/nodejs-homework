const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { ctrlWrapper } = require("../helpers");

const { User } = require("../models");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw createHttpError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      throw createHttpError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    throw createHttpError(401, "Not authorized");
  }
};

module.exports = ctrlWrapper(auth);
