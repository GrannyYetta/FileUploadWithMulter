const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = ".jpg")
      cb(null, file.fieldname + '-' + uniqueSuffix)}
  })

const upload = multer({ storage: "/uploads" });

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/upload-profile-pic", upload.single("profile_pic"), (req, res) => {
  console.log(req.file);
  res.send("Upload successful");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
