const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token provided or token format is invalid." });
    }

    token = token.split(" ")[1]; // Using a synchronous version for simplicity, which is fine for middleware. // A more robust solution might use promisify, but this is a quick fix.
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
