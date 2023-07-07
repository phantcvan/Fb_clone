const express = require("express");
const router = express.Router();
const database = require("../utils/database");
require("dotenv").config();

// lấy tag theo post_id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT u.id, u.first_name, u.last_name
    FROM tbl_tag t
    JOIN tbl_users u ON t.user_id = u.id
    WHERE t.post_id = ?`;
    let data = await database.execute(query, [id]);
    let [tags] = data;
    res.status(200).json({
      tags,
      // postQuantity: post.length,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
// Thêm tag vào bài post
router.post("/", async (req, res) => {
  const { post_id, tags } = req.body;
  console.log(tags);

  try {
    for (const tag of tags) {
      const data = { post_id, tag: tag };
      const query = "INSERT INTO tbl_tag (post_id, user_id) VALUES (?, ?)";
      await database.execute(query, [data.post_id, data.tag]);
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Tags added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to add tags",
      error,
    });
  }
});

module.exports = router;
