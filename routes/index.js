var express = require("express");
var router = express.Router();
const formidable = require("formidable");
var imgModel = require("./model");
var mongoose = require("mongoose");

//online folder
var multer = require("multer");
var fs = require("fs");
var path = require("path");

const MONGO_URI =
  "mongodb+srv://esru2:Yonn4321@cluster0.sbh1vyc.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((resp) => {
    console.log("connected");
  });

const form = new formidable.IncomingForm({
  uploadDir: path.join(__dirname, "../upls"),
});

/* GET home page. */
router.get("/images", function (req, res, next) {
  imgModel
    .find({})
    .then((items) => res.json(items))
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred");
    });
  console.log("img requested");
});

router.post("/upload", (req, res, next) => {
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    } else {
      var obj = {
        name: "req.body.name",
        desc: "req.body.desc",
        img: {
          data: fs.readFileSync(
            path.join(__dirname, "..", "upls", files["myImage"].newFilename)
          ),
          contentType: "image/png",
        },
      };

      imgModel.create(obj).catch((err) => console.log(err));
      console.log(files["myImage"].originalFilename);

      res.json({ fields, files });
      console.log(
        path.join(__dirname, "..", "upls", files["myImage"].newFilename)
      );
    }
  });
});

module.exports = router;
