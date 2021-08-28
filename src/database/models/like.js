module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    'Like',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      bookSlug: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      like: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {},
  );
  Like.associate = (models) => {
    Like.belongsTo(models.Book, {
      foreignKey: 'bookSlug',
      as: 'bookLikes',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Like;
};
