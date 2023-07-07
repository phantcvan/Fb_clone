const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const relationRoutes = require("./routes/relation.routes");
const postRoutes = require("./routes/post.routes");
const tagRoutes = require("./routes/tag.routes");
const cmtRoutes = require("./routes/tag.routes");
require("dotenv").config();

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(morgan("dev"));
server.use(cors());
server.use(express.static("public"));

server.use("/api/v1/users", userRoutes);
server.use("/api/v1/relation", relationRoutes);
server.use("/api/v1/posts", postRoutes);
server.use("/api/v1/tag", tagRoutes);
server.use("/api/v1/cmt", cmtRoutes);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
