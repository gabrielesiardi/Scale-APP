const basicAuth = require("basic-auth");

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

module.exports = function (req, res, next) {
  const user = basicAuth(req);
  if (!user || user.name !== ADMIN_USER || user.pass !== ADMIN_PASS) {
    res.set("WWW-Authenticate", 'Basic realm="admin area"');
    return res.status(401).send("Access denied");
  }
  next();
};
