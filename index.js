const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const fileName = `${file.fieldname}-${Date.now()}-${File.originalname}`;
    //   Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

function fileFilter(req, file, cb) {
  const allowed = ["image/jpeg"];

  if (!allowed.includes(file.mimetype)) {
    cb(new Error("Please make sure to add a file with a .jpeg or .jpg extension");
  } else {
    cb(null, true);
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

const app = express();
const port = process.env.PORT || 5000;

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
