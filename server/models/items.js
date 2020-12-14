'use strict';
module.exports = (sequelize, DataTypes) => {
  const items = sequelize.define(
    'items',
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.STRING,
      descriptionUrl: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
      }
    },
    {}
  );
  // items.associate = function (models) {
  //   // associations can be defined here
  //   items.belongsTo(models.users, { foreignKey: '' })
  // };
  return items;
};
