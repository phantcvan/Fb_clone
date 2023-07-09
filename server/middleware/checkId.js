const Joi = require("joi");
const database = require("../utils/database");

const checkIsEmpty = (field) => {
  if (field === undefined || field === null || field === "") return true;
  else return false;
};

module.exports.checkExistPostId = async (req, res, next) => {
  let { id } = req.params;
  try {
    let data = await database.execute("SELECT * FROM tbl_post WHERE id = ?", [
      id,
    ]);
    let [findPost] = data;
    if (findPost.length === 0) {
      res.json({
        message: "This post not exists",
      });
    } else {
      next();
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

module.exports.checkExistMediaPostId = async (req, res, next) => {
  let { id } = req.params;
  try {
    let data = await database.execute(
      "SELECT * FROM tbl_media_post WHERE post_id = ?",
      [id]
    );
    let [findMedia] = data;
    if (findMedia.length === 0) {
      res.json({
        message: "This post has no media",
      });
    } else {
      next();
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
module.exports.checkTagExistPostId = async (req, res, next) => {
  let { id } = req.params;
  try {
    let data = await database.execute(
      "SELECT * FROM tbl_tag WHERE post_id = ?",
      [id]
    );
    let [findTag] = data;
    if (findTag.length === 0) {
      res.json({
        message: "This post has no tag",
      });
    } else {
      next();
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
