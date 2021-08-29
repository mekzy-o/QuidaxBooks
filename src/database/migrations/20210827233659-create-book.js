module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      title: {
        allowNull: false,
        unique: false,
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      body: {
        allowNull: false,
        unique: false,
        type: Sequelize.TEXT,
      },
      imgUrl: {
        allowNull: true,
        unique: false,
        type: Sequelize.TEXT,
      },
      authored_year: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      publisher: {
        type: Sequelize.STRING,
      },
      release_date: {
        type: Sequelize.STRING,
      },
      quantity_available: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.DECIMAL(20, 2).UNSIGNED,
        allowNull: false,
      },
      featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },
      genre: {
        type: Sequelize.STRING,
      },
      likeCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    })),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Books'),
};
