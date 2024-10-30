const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

const PORT = 4000;
const App = express();

const imagesFolder = path.join(__dirname, "Images");
if (!fs.existsSync(imagesFolder)) {
  fs.mkdirSync(imagesFolder);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

App.use(cors());

// Serve static files from the "public" directory
App.use(express.static(path.join(__dirname, "public")));

// POST route to handle image uploads
App.post("/post-image", upload.single("image"), (req, res) => {
  // console.log("Received image:", req.file);
  res.send("Image uploaded successfully");
});

App.listen(PORT, async () => {
  console.log("Cam server is running on port", PORT);
});
