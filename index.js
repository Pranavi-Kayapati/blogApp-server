const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRouter");

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.listen(8080, async () => {
  try {
    await connection;
    console.log("Server running on port 8080");
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
});
