const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const todoRoutes = require('./Routes/todoRouter');
const authRoutes = require('./Routes/authRoutes');

app.use(bodyParser.json());

app.use('/auth', authRoutes);

// Authentication middleware
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  jwt.verify(token, 'secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
});

app.use('/todos', todoRoutes);

module.exports = app;