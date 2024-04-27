require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cors = require("cors");

// Import sequelize instance and model associations
const { sequelize } = require("./data/database");
const associateModels = require("./models/associations");

const app = express();

// Middleware for parsing JSON and handling CORS
app.use(express.json());
app.use(cors());

// Configure session store with Sequelize
const sessionStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000, // Checks every 15 minutes
  expiration: 24 * 60 * 60 * 1000, // 24 hours
});

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    proxy: process.env.NODE_ENV === "production", // trust the reverse proxy in production (e.g., Nginx)
    cookie: {
      secure: process.env.NODE_ENV === "production", // use secure cookies in production (HTTPS)
      httpOnly: true, // minimize risk of XSS attacks
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Sync session store
sessionStore.sync();

// Initialize model associations
associateModels();

// Example route to test session functionality
app.get("/", (req, res) => {
  req.session.viewCount = (req.session.viewCount || 0) + 1;
  res.send(`Viewed ${req.session.viewCount} times`);
});

// Routes
const propertyRoutes = require("./routes/propertyRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const apiRoutes = require("./routes/apiRoutes");

// Use routes
app.use("/properties", propertyRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/mortgage-calculator", apiRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
