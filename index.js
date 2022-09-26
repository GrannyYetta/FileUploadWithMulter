const express = require("express");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg"];
  if (!allowed.includes(file.mimetype)) {
    req.fileValidationError = "Extension not supported";
    // if the file being uploaded does not have a .jpeg or .jpg extension, we set the fileValidationError to "Extension not supported"
    return cb(
      new Error(
        "Please make sure to add a file with a .jpeg or .jpg extension"
      ),
      false
    );
  } else {
    return cb(null, true);
  }
};

const upload = multer({ storage, fileFilter });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/upload-profile-pic", upload.single("profile_pic"), (req, res) => {
  console.log(req.file);

  const { file, fileValidationError } = req;

  // if (fileValidationError) {
  //   return res.status(500).send(fileValidationError);
  // }
  if (!file) {
    return res.status(500).send("Please upload a file");
  }
  res.send("Upload successful");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
