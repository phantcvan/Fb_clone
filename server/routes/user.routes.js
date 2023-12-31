const express = require("express");
const router = express.Router();
const database = require("../utils/database");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  validateSignUpInput,
  validateData,
  checkExistUser,
  validateDataLogin,
  checkEmailLogin,
} = require("../middleware/validate");
const { sendVerificationEmail } = require("../helpers/mailer");
const { generateToken } = require("../helpers/token");

router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM facebook.tbl_users");
    let [users] = data;
    res.json({
      status: 200,
      users,
    });
  } catch (error) {
    res.json({ error });
  }
});
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const query = `SELECT * FROM facebook.tbl_users WHERE id=? `;
    let data = await database.execute(query, [id]);
    let [user] = data;
    res.json({
      status: 200,
      user,
    });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/register", async (req, res) => {
  const { id, first_name, last_name, email, password, gender, birthday } =
    req.body;
  console.log(req.body);

  const avatar = process.env.DATABASE_URL + "/avatar_default.jpg";
  const cover = process.env.DATABASE_URL + "/cover_default.png";
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const verify = 1;
  const isOnline = 0;
  const notification = 0;
  const newUser = [
    id,
    first_name,
    last_name,
    email.toLowerCase(),
    hash,
    avatar,
    cover,
    gender,
    birthday,
    verify,
    isOnline,
    notification,
  ];
  try {
    const query = `
        INSERT INTO tbl_users (id,first_name,last_name,email,password,avatar,cover,gender,birthday,verify, isOnline, notification)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
    let data = await database.execute(query, newUser);
    let [users] = data;
    console.log(newUser);
    const emailVerificationToken = generateToken(
      {
        userId: id.toString(),
      },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(email, first_name, url);

    return res.status(200).json({
      status: 200,
      message: "Add User successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

// active email
router.post("/active", async (req, res) => {
  let { token } = req.body;
  console.log("token", token);
  const user = jwt.verify(token, process.env.SECRET);
  if (user) {
    try {
      let data = await database.execute(
        "SELECT * FROM tbl_users WHERE id = ?",
        [user.userId]
      );
      let [find] = data;
      console.log(find[0].verify);
      if (find[0].verify === 1) {
        res.json({
          message: "This email is already activated",
        });
      } else {
        await database.execute("update tbl_users set verify = 1 where id=?", [
          find[0].id,
        ]);
        return res.json({
          message: "Account has been activated successfully.",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        error,
      });
    }
  }
});
// log-in
router.post("/login", validateDataLogin, checkEmailLogin, async (req, res) => {
  let { email, password } = req.body;
  console.log(req.body);
  try {
    let data = await database.execute(
      "SELECT * FROM tbl_users WHERE email = ?",
      [email]
    );
    let [find] = data;
    let hash = find[0].password;
    let valid = bcrypt.compareSync(password, hash);
    if (!valid) {
      res.json({
        message: "Password incorrect. Please try again.",
      });
    } else {
      // create token
      let token = generateToken(
        {
          userId: find[0].id,
        },
        "30d"
      );
      res.json({
        status: 200,
        message: "Login Successfully",
        token: token,
        data: find[0],
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
});

router.post("/auth", async (req, res) => {
  try {
    let { token } = req.body;
    const user = jwt.verify(token, process.env.SECRET);
    let data = await database.execute("SELECT * FROM tbl_users WHERE id = ?", [
      user.userId,
    ]);
    let [findUser] = data;
    res.status(200).json({
      status: 200,
      findUser,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

// Update notification
router.post("/notification", async (req, res) => {
  const { id, notification } = req.body;
  try {
    const query = `
    UPDATE tbl_users SET notification = ? WHERE id=?`;
    let data = await database.execute(query, [notification, id]);
    res.json({
      message: "Update notification successfully",
    });
  } catch (error) {
    res.json({ error });
  }
});
// Update avatar
router.put("/updateAvatar", async (req, res) => {
  const { id, img } = req.body;
  console.log("id, avatar -->>", id, img);
  try {
    const query = `
    UPDATE tbl_users SET avatar = ? WHERE id=?`;
    let data = await database.execute(query, [img, id]);
    res.json({
      status: 200,
      message: "Update avatar successfully",
    });
  } catch (error) {
    status: 400, res.json({ error });
  }
});
// Update cover
router.put("/updateCover", async (req, res) => {
  const { id, img } = req.body;
  console.log("id, cover -->>", id, img);
  try {
    const query = `
    UPDATE tbl_users SET cover = ? WHERE id=?`;
    let data = await database.execute(query, [img, id]);
    res.json({
      status: 200,
      message: "Update cover successfully",
    });
  } catch (error) {
    status: 400, res.json({ error });
  }
});
// Update user info
router.put("/updateUser/:id", async (req, res) => {
  console.log("req.body", req.body);
  try {
    const { id } = req.params;
    const {
      bio,
      job,
      highSchool,
      college,
      currentCity,
      hometown,
      relationship,
      relationship_to,
    } = req.body;

    console.log("id, job -->>", id, job);

    const query = `UPDATE tbl_users SET bio=?, job=?, highSchool=?, college=?, currentCity=?, hometown=?, relationship=?, relationship_to=? WHERE id=?`;

    const data = await database.execute(query, [
      bio,
      job,
      highSchool,
      college,
      currentCity,
      hometown,
      relationship,
      relationship_to,
      id,
    ]);

    console.log("data", data);

    res.json({
      status: 200,
      message: "Update info successfully",
      data,
    });
  } catch (error) {
    res.json({ status: 400, error });
  }
});

module.exports = router;
