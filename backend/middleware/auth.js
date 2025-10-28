const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token provided or token format is invalid." });
    }

    token = token.split(" ")[1]; 
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = { id: decoded.id || decoded._id };

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;