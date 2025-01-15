const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const { default: checkAuth } = require("./middleware/checkAuth");

dotenv.config();

const mainRoutes = require("./routes/mainRoutes");
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/home", checkAuth, homeRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
