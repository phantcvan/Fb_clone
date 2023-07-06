const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto"
};

router.post("/", async (req, res) => {
  const {media} = req.body
  try {
    const result = await cloudinary.uploader.upload(media, opts);
    if (result && result.secure_url) {
      console.log(result.secure_url);
      return res.json({ secure_url: result.secure_url });
    } else {
      throw new Error("Failed to upload image to Cloudinary");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
