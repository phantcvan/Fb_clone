const express = require("express");
const router = express.Router();
const database = require("../utils/database");
require("dotenv").config();

// lấy cmt theo post_id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM tbl_cmt WHERE post_id = ? ORDER BY date DESC`;
    let data = await database.execute(query, [id]);
    let [comments] = data;
    res.status(200).json({
      comments,
      // postQuantity: post.length,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
// Thêm cmt vào bài post
router.post("/", async (req, res) => {
  const { post_id, user_id, content, mediaUrl, level, cmt_reply } = req.body;
  console.log(post_id, user_id, content, mediaUrl, level, cmt_reply);
  const date = new Date().toISOString();
  try {
    const query = `INSERT INTO tbl_cmt(post_id, user_id, content, mediaUrl, level, cmt_reply, date) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    let data = await database.execute(query, [
      post_id,
      user_id,
      content,
      mediaUrl,
      level,
      cmt_reply,
      date,
    ]);
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to add comment",
      error,
    });
  }
});

module.exports = router;
