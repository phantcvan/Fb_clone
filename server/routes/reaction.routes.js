const express = require("express");
const router = express.Router();
const database = require("../utils/database");
require("dotenv").config();

// lấy reaction theo post_id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM tbl_reaction WHERE post_id = ?`;
    let data = await database.execute(query, [id]);
    let [reactions] = data;
    res.status(200).json({
      reactions,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
// Thêm reaction vào bài post
router.post("/:post_id", async (req, res) => {
  const { post_id } = req.params;
  const { user_id, reaction_type } = req.body;
  console.log(post_id, user_id, reaction_type);

  try {
    const query = `INSERT INTO tbl_reaction(post_id, user_id, reaction_type) VALUES (?, ?, ?)`;
    let data = await database.execute(query, [post_id, user_id, reaction_type]);
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Reaction added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to add Reaction",
      error,
    });
  }
});
// Update reaction cho bài post
router.put("/:post_id", async (req, res) => {
  const { post_id } = req.params;
  const { user_id, reaction_type } = req.body;

  try {
    const query = ` UPDATE tbl_reaction SET reaction_type = ?
    WHERE post_id=? AND user_id=?`;
    let data = await database.execute(query, [reaction_type, post_id, user_id]);
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Reaction added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to add Reaction",
      error,
    });
  }
});
// Delete reaction cho bài post
router.delete("/:post_id", async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = req.body;
  console.log(post_id, user_id);
  try {
    const query = `DELETE FROM tbl_reaction WHERE post_id = ? AND user_id = ?`;
    let data = await database.execute(query, [post_id, user_id]);
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Reaction deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to add Reaction",
      error,
    });
  }
});

module.exports = router;
