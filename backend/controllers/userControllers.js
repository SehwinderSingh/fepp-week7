const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.SECRET,
    { expiresIn: "3d" }
  );
};

const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone_number,
      gender,
      date_of_birth,
      membership_status,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phone_number ||
      !gender ||
      !date_of_birth ||
      !membership_status
    ) {
      return res.status(400).json({ error: "Please add all fields" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      gender,
      date_of_birth,
      membership_status,
    });

    const token = generateToken(user);

    res.status(201).json({
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please add all fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  signup,
  login,
};
