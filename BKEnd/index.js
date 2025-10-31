require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const path = require('path');
const app = express();

// Import routes
const authRoutes = require('./Router/auth');
const jobRoutes = require('./Router/jobs');
const applicationRoutes = require('./Router/app');

//  Database connection
require('./connection/connect');

//  Middlewares
app.use(express.json());
app.use(cookieParser());

// Enable CORS for frontend (important for cookies)
app.use(
  cors({
    origin: 'https://jobfair-fend.netlify.app/', //  your frontend URL
    credentials: true, // 👈 allow cookies to be sent
  })
);

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//  API Routes
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);

//  Static folder for resumes
app.use('/uploads/resumes', express.static(path.join(__dirname, 'uploads/resumes')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//  Server listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(` Server is running at http://localhost:${port}`);
});
