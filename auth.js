const jwt = require("jsonwebtoken");
const secret = "movieAPI";

module.exports.createAccessToken = (user) => {
  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  return jwt.sign(data, secret, {});
};

module.exports.verify = (req, res, next) => {
  let token = req.headers.authorization;

  if (typeof token === "undefined") {
    return res.status(401).send({ auth: "Failed. No Token" });
  }

  token = token.slice(7, token.length);

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.status(401).send({
        auth: "Failed",
        message: err.message,
      });
    }

    req.user = decodedToken;
    next();
  });
};

module.exports.verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(403).send({
      auth: "Failed",
      message: "Action Forbidden",
    });
  }
};

module.exports.errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.json({
    error: {
      message: errorMessage,
      errorCode: err.code || "SERVER_ERROR",
      details: err.details || null,
    },
  });
};