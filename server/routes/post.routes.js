const express = require("express");
const router = express.Router();
const database = require("../utils/database");
const {
  checkExistMediaPostId,
  checkTagExistPostId,
  checkExistPostId,
} = require("../middleware/checkId");
require("dotenv").config();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// load dữ liệu bài post
router.post("/loadAll/:id", async (req, res) => {
  const { id } = req.params;
  const { start } = req.body;
  // if (start == 0) start = 1;
  const perPage = 3;
  const startIndex = (start - 1) * perPage;
  const endIndex = startIndex + perPage;
  try {
    const query = `SELECT p.*, m.mediaUrl, m.type
    FROM tbl_post p
    LEFT JOIN tbl_media_post m
    ON p.id = m.post_id
    WHERE
        CASE
            WHEN audience = 'public' THEN 1
            WHEN audience = 'friends' AND
                 EXISTS (
                    SELECT 1 FROM tbl_relation
                    WHERE (request_id = ? AND accept_id = p.user_id AND status = 2)
                          OR (request_id = p.user_id AND accept_id = ? AND status = 2)
                 ) THEN 1
            ELSE 0
        END = 1
        ORDER BY p.date DESC;
        `;
    let data = await database.execute(query, [id, id]);
    let [allPosts] = data;
    const posts = allPosts.slice(startIndex, endIndex);
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
router.get("/loadPostsBelongToUser/:id", async (req, res) => {
  const { id } = req.params;
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
// lấy post theo post_id
router.get("/loadPostsBelongToPostId/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT p.*, m.mediaUrl, m.type
    FROM tbl_post p
    LEFT JOIN tbl_media_post m ON p.id = m.post_id
    WHERE p.id = ?
    ORDER BY p.date DESC`;
    let data = await database.execute(query, [id]);
    let [post] = data;
    // const post = allPost.slice(start, start + 5);
    res.status(200).json({
      post,
      // postQuantity: post.length,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
// Search
router.get("/search/search", async (req, res) => {
  const searchQuery = req.query.keyword;
  console.log(req.query);
  try {
    let query = `SELECT p.*, m.mediaUrl, m.type
    FROM tbl_post p
    LEFT JOIN tbl_media_post m ON p.id = m.post_id`;
    const queryParams = [];
    if (searchQuery && searchQuery.trim() !== "") {
      query += " WHERE p.content LIKE ?";
      queryParams.push(`%${searchQuery}%`);
    }
    query += " ORDER BY date DESC";
    let data = await database.execute(query, queryParams);
    let [findPosts] = data;
    res.json({
      status: "success",
      findPosts,
    });
  } catch (error) {
    res.json({ error });
  }
});

// Upload media
router.post("/uploadMedia", async (req, res) => {
  // const { id } = req.params;
  // const { mediaPost } = req.body;
  // console.log("mediaPost", mediaPost);
  try {
    const query = `
    INSERT INTO tbl_media_post(post_id, mediaUrl, type) VALUES (?, ?, ?)`;
    await database.execute(query, [
      req.body.post_id,
      req.body.mediaUrl,
      req.body.type,
    ]);
    console.log("123");
    res.json({
      message: "Upload Media successfully",
    });
  } catch (error) {
    res.json({ error });
  }
});
// Upload post
router.post("/createPost", async (req, res) => {
  console.log("postData ID", req.body.id);
  try {
    const query = `
    INSERT INTO tbl_post(id, user_id, content, audience, feeling, location, bgUrl, textColor, date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // await database.execute(query, [req.body]);
    await database.execute(query, [
      req.body.id,
      req.body.user_id,
      req.body.content,
      req.body.audience,
      req.body.feeling,
      req.body.location,
      req.body.bgUrl,
      req.body.textColor,
      req.body.date,
    ]);
    console.log("123");
    res.json({
      status: 200,
      message: "Update notification successfully",
    });
  } catch (error) {
    res.json({ error });
  }
});
// Update post
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  console.log("postData UPDATE", req.body);
  try {
    const query = `
    UPDATE tbl_post SET content = ?, audience = ?, feeling = ?, location = ?, bgUrl = ?, textColor = ?
     WHERE id=?`;
    let data = await database.execute(query, [
      req.body.content,
      req.body.audience,
      req.body.feeling,
      req.body.location,
      req.body.bgUrl,
      req.body.textColor,
      id,
    ]);
    console.log("123");
    let [post] = data;
    res.json({
      message: "Update relationship successfully",
      post,
    });
  } catch (error) {
    res.json({ error });
  }
});
// Delete post
router.delete("/post/:id", checkExistPostId, async (req, res) => {
  const { id } = req.params;
  console.log("DELETE POST");
  try {
    await database.execute(`DELETE FROM tbl_post WHERE id = ?`, [id]);
    res.json({
      status: "success",
      message: "Delete post successfully",
    });
  } catch (error) {
    res.json({ error });
  }
});
// Delete media
router.delete("/media/:id", checkExistMediaPostId, async (req, res) => {
  const { id } = req.params;
  console.log("DELETE Media");

  try {
    await database.execute(`DELETE FROM tbl_media_post WHERE post_id = ${id}`);
    res.json({
      status: "success",
      message: "Delete successfully",
    });
  } catch (error) {
    res.json({ error });
  }
});
// Delete tag
router.delete("/tag/:id", checkTagExistPostId, async (req, res) => {
  const { id } = req.params;
  console.log("DELETE TAG");

  try {
    await database.execute(`DELETE FROM tbl_tag WHERE post_id = ${id}`);
    res.json({
      status: "success",
      message: "Delete successfully",
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
