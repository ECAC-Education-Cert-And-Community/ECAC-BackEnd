const express = require("express");
const app = express();
app.use(express.json());

// env
const dotenv = require("dotenv");
dotenv.config();

const Activity = require("./routes/Activity");
const Comment = require("./routes/Comment");
const Post = require("./routes/Post");
const Search = require("./routes/Search");

app.use("/post", Post);
app.use("/:id/comment", Comment);
app.use("/activity", Activity);
app.use("/search", Search);

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
