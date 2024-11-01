const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const PORT = 4000;
const App = express();

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dtmhts73e",
  api_key: "338561957955172",
  api_secret: "dM11X5YeQ8nKwW04nu5PzRNdraA",
});

const imagesFolder = path.join(__dirname, "Images");
if (!fs.existsSync(imagesFolder)) {
  fs.mkdirSync(imagesFolder);
}

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, imagesFolder);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "webCam", // specify the Cloudinary folder where images will be stored
    format: async (req, file) => "jpg", // or any format you prefer
    public_id: (req, file) => Date.now(), // generate a unique ID for the file
  },
});

const upload = multer({ storage: storage });

App.use(cors());

App.post("/post-image", upload.single("image"), (req, res) => {
  res.send("Image uploaded successfully to Cloudinary");
});

App.listen(PORT, async () => {
  console.log("Cam server is running on port", PORT);
});
