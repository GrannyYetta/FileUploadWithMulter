const multer = require("multer");
const upload = multer().single("avatar");

app.post("/profile", function (req, res) {
  upload(req, res, function (err) {
    // if (err instanceof multer.MulterError) {
    //   // A Multer error occurred when uploading.
    // } else if (err) {
    //   // An unknown error occurred when uploading.
    // }

    // Everything went fine.

    console.log(multer);
  });
});
