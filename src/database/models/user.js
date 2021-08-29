/* eslint-disable no-param-reassign */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        required: true,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {},
  );
  User.associate = (models) => {
    User.hasMany(models.Rate, {
      foreignKey: 'userId',
      as: 'userRating',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  User.beforeCreate((user) => {
    user.email = user.email.toLowerCase();
  });
  return User;
};
