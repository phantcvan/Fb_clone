const express = require("express");
const router = express.Router();
const database = require("../utils/database");
require("dotenv").config();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const query = `SELECT * FROM facebook.tbl_relation 
            WHERE accept_id= ? OR request_id=? `;
    let data = await database.execute(query, [id, id]);
    let [request] = data;
    res.status(200).json({
      request,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
// Thống kê số lượng bạn bè
router.get("/friends/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const query = `SELECT u.*
    FROM tbl_users u
    JOIN tbl_relation r ON u.id = r.request_id OR u.id = r.accept_id
    WHERE ((r.request_id = ? OR r.accept_id = ?) AND r.status = 2)AND u.id != ? `;
    let data = await database.execute(query, [id, id, id]);
    let [friends] = data;
    res.status(200).json({
      friends,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
// Thông tin các yêu cầu kết bạn đã gửi đi
router.get("/myRequest/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const query = `SELECT u.*
    FROM tbl_users u
    JOIN tbl_relation r ON u.id = r.accept_id
    WHERE r.request_id = ? AND r.status = 1`;
    let data = await database.execute(query, [id]);
    let [request] = data;
    res.status(200).json({
      request,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.post("/isFriend", async (req, res) => {
  try {
    let { userId1, userId2 } = req.body;
    const query = `SELECT * FROM tbl_relation 
    WHERE (request_id=${userId2} AND accept_id=${userId1} AND status=2) 
    OR (request_id=${userId1} AND accept_id=${userId2} AND status=2);`;
    let data = await database.execute(query);
    let [checkFriend] = data;
    res.status(200).json({
      checkFriend,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
// Add friend
router.post("/sendRequest", async (req, res) => {
  try {
    let { request_id, accept_id, status, date_request } = req.body;
    console.log(request_id, accept_id, status, date_request);
    const query = `INSERT INTO tbl_relation(request_id, accept_id, status, date_request) VALUES (?, ?, ?, ?)`;
    let data = await database.execute(query, [
      request_id,
      accept_id,
      status,
      date_request,
    ]);
    let [checkFriend] = data;
    res.status(200).json({
      checkFriend,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.post("/mutual-relations", async (req, res) => {
  try {
    let { user1, user2 } = req.body;
    console.log(req.body);
    const query = `SELECT u.id, u.first_name, u.last_name
    FROM tbl_users u
    INNER JOIN tbl_relation r1 ON ((u.id = r1.request_id AND r1.accept_id = ${user1} AND r1.status = 2)
    OR (u.id = r1.accept_id AND r1.request_id = ${user1} AND r1.status = 2))
    INNER JOIN tbl_relation r2 ON ((u.id = r2.request_id AND r2.accept_id = ${user2} AND r2.status = 2)
    OR (u.id = r2.accept_id AND r2.request_id = ${user2} AND r1.status = 2))`;
    let data = await database.execute(query);
    let [mutual] = data;
    res.status(200).json({
      mutual,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.put("/accept", async (req, res) => {
  const { request_id, accept_id } = req.body;
  console.log(request_id, accept_id);
  try {
    const query = `
    UPDATE tbl_relation SET status = 2 WHERE request_id = ? AND accept_id = ?`;
    let data = await database.execute(query, [request_id, accept_id ]);
    let [contact] = data;
    res.json({
      message: "Update relationship successfully",
      contact,
    });
  } catch (error) {
    res.json({ error });
  }
});
// Từ chối lời mời kết bạn
router.delete("/cancelRequest", async (req, res) => {
  let { request_id, accept_id } = req.body;
  console.log( request_id, accept_id );
  try {
    await database.execute(
      `DELETE FROM tbl_relation WHERE request_id = ? AND accept_id = ? `,
      [request_id, accept_id]
    );
    res.json({
      status: "success",
      message: "Delete successfully",
    });
  } catch (error) {
    res.json({ error });
  }
});
// Xoá bạn bè
router.delete("/deleteFriend", async (req, res) => {
  let { user1, user2 } = req.body;
  console.log( user1, user2 );
  try {
    await database.execute(
      `DELETE FROM tbl_relation WHERE (request_id = ? AND accept_id = ?) OR (request_id = ? AND accept_id = ?)`,
      [user1, user2, user2, user1]
    );
    res.json({
      status: "success",
      message: "Delete successfully",
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
