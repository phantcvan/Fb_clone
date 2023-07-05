const express = require("express");
const router = express.Router();
const database = require("../utils/database");
require("dotenv").config();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  // const start = parseInt(req.params.start);
  try {
    const query = `SELECT p.*, m.mediaUrl, m.type
    FROM tbl_post p
    LEFT JOIN tbl_media_post m ON p.id = m.post_id
    ORDER BY p.date DESC`;
    let data = await database.execute(query);
    let [posts] = data;
    // const post = allPost.slice(start, start + 5);
    res.status(200).json({
      posts,
      // postQuantity: post.length,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
// lấy post theo user_id
router.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const query = `SELECT p.*, m.mediaUrl, m.type
    FROM tbl_post p
    LEFT JOIN tbl_media_post m ON p.id = m.post_id
    WHERE p.user_id = ?
    ORDER BY p.date DESC`;
    let data = await database.execute(query, [id]);
    let [posts] = data;
    // const post = allPost.slice(start, start + 5);
    res.status(200).json({
      posts,
      // postQuantity: post.length,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

module.exports = router;
