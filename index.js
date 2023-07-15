const app = require('./app');
const db = require('./util/database');

const PORT = process.env.PORT || 3000;

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