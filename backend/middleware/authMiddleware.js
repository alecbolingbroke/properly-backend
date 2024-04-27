const jwt = require("jsonwebtoken");

// JWT authentication middleware
const authenticateToken = (req, res, next) => {
  // Extract token from Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401); // Unauthorized if no token
  
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden if token is invalid
      req.user = user;
      next();
    });
  };

// Export the middleware
module.exports = { authenticateToken };