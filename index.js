const app = require('./app');
const User = require('./Models/user');
const Todo = require('./Models/todo');
const db = require('./util/database');

const PORT = process.env.PORT || 3000;

Todo.belongsTo(User,{constraints:true, onDelete: 'CASCADE'});
User.hasMany(Todo);

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

//   npm install express sequelize mysql2
//   npm install jsonwebtoken bcrypt
//   npm install joi