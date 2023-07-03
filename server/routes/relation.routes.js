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

router.put("/accept/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
    UPDATE tbl_relation SET relation_type = 2 WHERE id=?`;
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
