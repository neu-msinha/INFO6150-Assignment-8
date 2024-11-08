const User = require('../models/User');
const bcrypt = require('bcrypt');
const path = require('path');

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already exists'
      });
    }

    // Password strength validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      fullName,
      email,
      password: hashedPassword
    });

    await user.save();
    
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: {
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    if (fullName) {
      user.fullName = fullName;
    }

    if (password) {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          status: 'error',
          message: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
        });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: {
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { __v: 0 });
    
    res.status(200).json({
      status: 'success',
      data: users
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    user.imagePath = req.file.path;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Image uploaded successfully',
      data: {
        imagePath: user.imagePath
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
