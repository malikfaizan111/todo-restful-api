const app = require('./app');
const db = require('./util/database');

const PORT = process.env.PORT || 3000;

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

//   npm install express sequelize pg pg-hstore
//   npm install jsonwebtoken bcrypt