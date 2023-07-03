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

router.put("/accept/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
    UPDATE tbl_relation SET status = 2 WHERE id=?`;
    let data = await database.execute(query, [id]);
    console.log("123");
    let [contact] = data;
    res.json({
      message: "Update relationship successfully",
      contact,
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
