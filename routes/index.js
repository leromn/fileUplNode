var express = require("express");
var router = express.Router();
const formidable = require("formidable");
//online folder
var multer = require("multer");
var fs = require("fs");
var path = require("path");

const form = new formidable.IncomingForm({
  uploadDir: path.join(__dirname, "../upls"),
});

/* GET home page. */
router.get("/home", function (req, res, next) {
  res.send("home");
});


router.post("/upload", (req, res, next) => {
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    } else {
      var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
          data: fs.readFileSync(
            path.join(__dirname + "/uploads/" + req.file.filename)
          ),
          contentType: "image/png",
        },
      };

      imgModel.create(obj).catch((err) => console.log(err));
      console.log(files["myImage"].originalFilename);
      res.json({ fields, files });
    }
  });
});

module.exports = router;
