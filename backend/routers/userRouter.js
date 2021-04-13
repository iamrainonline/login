const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER ROUTE
router.post("/", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    // Validation
    if (!email || !password || !passwordVerify)
      return res.status(400).json({ msg: "Please enter all req. fields" });
    if (password.length < 5)
      return res.status(400).json({ msg: "Password must be at least 5 " });
    if (password !== passwordVerify)
      return res.status(400).json({ msg: "Passwords dont match" });

    // Check for existing user
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ msg: "Account already in use" });

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Save a new user account to the DATABASE
    const newUser = new User({
      email: email,
      passwordHash: passwordHash,
    });

    const savedUser = await newUser.save();

    // Sign the token!
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // Send the token in HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// LOGIN ROUTE

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ msg: "Wrong email or Password" });

    // check corret password
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ msg: "Wrong email or Password" });

    // Sign the token!
    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // Send the token in HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
    // Catch error
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// Logout

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

// LOGGED IN ? boolean
router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);
    
  } catch (error) {
    res.json(false);
  }
});

module.exports = router;
