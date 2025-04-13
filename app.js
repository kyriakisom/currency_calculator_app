const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const currencyRoutes = require('./routes/currencies');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/calculator', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ✅ Session middleware (must come BEFORE routes)
app.use(session({
  secret: process.env.SESSION_SECRET || '123456789012345678901234567890',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3 * 60 * 60 * 1000, // 3 hours
    secure: process.env.NODE_ENV === 'production', // true in production with HTTPS
    httpOnly: true,
  }
}));

// Security middleware

app.use(cors({
  origin: 'http://localhost:8080', // your frontend origin
  credentials: true // allow cookies and sessions
}));
app.use(mongoSanitize());
app.use(helmet());

// API Routes
app.use('/users', userRoutes);
app.use('/currencies', currencyRoutes);

// Static frontend serving
app.use(express.static(path.join(__dirname, 'calculator-frontend', 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'calculator-frontend', 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
