// Node Modules Imports

let express = require("express");
let hbs = require("express-handlebars");
let path = require("path");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");

// Routes Imports

let home = require("./routes/home");
let message = require("./routes/message");
let profile = require("./routes/profile");
let search = require("./routes/search");
let settings = require("./routes/settings");
let signup = require("./routes/signup");
let login = require("./routes/login");
let logout = require("./routes/logout");

// Initialisation

let app = express();
app.engine("hbs", hbs({ extname: ".hbs", defaultLayout: "main", layoutsDir: __dirname + "/views/layouts/" }));
app.set("views", path.join(__dirname, "/views/"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "/public/")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes

app.use("/home", home);
app.use("/message", message);
app.use("/profile", profile);
app.use("/search", search);
app.use("/settings", settings);
app.use("/signup", signup);
app.use("/login", login);
app.use("/logout", logout);

// Handlers

app.get("/", (req, res) => {
    res.redirect("/home");
});

app.use((err, req, res, next) => {
    res.send("<span><h1>Error</h1><h3>" + err.message + "</h3><h5>" + err.status || 500 + "</h5></span>");
});

// Configuration
let port = process.env.PORT || 2807;
app.listen(port, () => {
    console.log("Server Status: Online @" + port);
});