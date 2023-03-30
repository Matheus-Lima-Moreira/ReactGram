const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d"
  });
};

// Register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const user = await User.findOne({ email });

  if (user) {
    return res.status(422).json({ error: 'User already exists' });
  }

  // Hash password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash
  });

  // If user was created successfully, return the token
  if (!newUser) {
    return res.status(422).json({ errors: ['User could not be created'] });
  }

  res.status(201).json({
    message: 'User created successfully',
    _id: newUser._id,
    token: generateToken(newUser._id)
  });
};

// Sign user in
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check if user exists
  if (!user) {
    return res.status(404).json({ error: 'User does not exist' });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).json({ error: 'Invalid credentials' });
  }

  res.status(201).json({
    message: 'User logged in successfully',
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id)
  });
};

module.exports = {
  register,
  login
};