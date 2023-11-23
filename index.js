const express = require("express");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const connect = require("./src/config/db");
const post = require("./src/routes/post.route")
const app = express();

app.use(express.json());
app.use(cors());
app.use("/post", post);

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Listening on http://localhost:${PORT}`);
  } catch (e) {
    console.log(e);
  }
});
