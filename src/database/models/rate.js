module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define(
    'Rate',
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
      ratings: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {},
  );
  Rate.associate = (models) => {
    Rate.belongsTo(models.Book, {
      foreignKey: 'bookSlug',
      as: 'bookDetails',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Rate;
};
