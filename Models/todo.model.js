module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  
    return Todo;
  };