const mongoose = require("mongoose");
mongoose.connect(process.env.mongodb_url)
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error(' MongoDB connection error:', err));
