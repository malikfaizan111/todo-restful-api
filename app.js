const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); 
const todoRoutes = require('./Routes/todoRouter');
const authRoutes = require('./Routes/authRoutes');
const errorController = require('./controllers/error');
const User = require('./Models/user');
let userProfile;
app.use(bodyParser.json());

app.use('/auth', authRoutes);

// Authentication middleware
app.use((req, res, next) => {
  const token = req.headers.authorization;
 
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  jwt.verify(token, 'secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    userProfile = decoded.userId;
    next();
  });
});

app.use((req,res,next)=>{
  User.findByPk(userProfile).
  then(user =>{
      req.user = user;
      next();
  }).catch(err => console.log('Error!!!!!',err));
})

app.use('/todos', todoRoutes);

app.use(errorController.get404);
module.exports = app;