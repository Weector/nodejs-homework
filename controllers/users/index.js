const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const resendingEmail = require("./resendingEmail");

module.exports = {
  register,
  login,
  current,
  logout,
  updateAvatar,
  verify,
  resendingEmail,
};
