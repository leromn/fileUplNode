var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");
const port = process.env.PORT || 8080;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

var listener = app.listen(port, function () {
  console.log("Listening on port " + listener.address().port);
});
