const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
    try {
        const { username, email, password, role, phone, location, company } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please Provide the required fields' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exixts" });
        }
        else {
            const hshedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                password: hshedPassword,
                role,
                phone,
                location,
                company
            });
            await newUser.save();
            res.status(201).json({ message: "User regestered sucessfully " })
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //  Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '5d' }
    );

    // Set token as HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // cannot be accessed by JS
      secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
      sameSite: 'strict', // CSRF protection
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      message: 'Login successful',
      user: userData,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
const logout = (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true if using HTTPS
      sameSite: 'strict', // protects from CSRF
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports =
{
    register,
    login,
    getProfile,
    logout
};
