require("express-async-errors");

const dotenv = require("dotenv");
const findConfig = require("find-config");
dotenv.config({ path: findConfig(".env") });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.use(cors({ origin: `http://localhost:${process.env.FRONTEND_PORT || 3000}` }));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

const linkRoutes = require("./routes/link.routes");
app.use("/links", linkRoutes);

const errorHandler = require("./middlewares/error-handler.middleware");
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  const db = require("./configs/db.config");

  const port = process.env.BACKEND_PORT || 8080;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

module.exports = app;