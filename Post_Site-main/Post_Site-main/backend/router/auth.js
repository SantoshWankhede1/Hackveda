const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/middleware")

require("../db/conn");

const User = require("../model/userschema");
const Post = require("../model/postSchema");

router.get("/", (req, res) => {
  res.send("HEllo");
});

//Using Async-Await
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.json({ error: "User already exists" });
    }
    //new user instance
    const user = new User({ firstName, lastName, email, password });


    user.save();
    res.json({ message: "User saved successfully" });
  } catch (err) {
    console.log(err); 
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const userLogin = await User.findOne({ email });

    if (!userLogin) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);

    if (!isMatch) {
      // If password doesn't match
      return res.status(400).json({ error: "Invalid Password" });
    }

    //Generating Token
    const token = await userLogin.generateAuthToken();
    console.log(token);

    //storing in cookies
    res.cookie("jwttoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httponly: true,
    });

    // User logged in successfully
    res.json({ message: "User Loggedin successfully " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/post", async (req, res) => {
  const { title, imageUrl, description } = req.body;
  const post = new Post({ title, imageUrl, description });
  await post.save();
  res.json({ message: "Post saved successfully" });
});

router.get("/posts", async (req, res) => {
  const postDisplay = await Post.find({});
  res.json({ PostDisplay: postDisplay });
});



module.exports = router;
