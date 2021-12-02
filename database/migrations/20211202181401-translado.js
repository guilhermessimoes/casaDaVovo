'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('translados', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      transportaPet:{
        type: Sequelize.STRING,
        allowNull: false
      },
      acessivelDeficiente:{
       type: Sequelize.STRING,
       allowNull: false
      },
      levarBagagens:{
       type: Sequelize.STRING,
       allowNull: false
      },
      recolheHotel:{
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao:{
        type: Sequelize.STRING,
        allowNull: false
      },
      imagemTranslado:{
        type: Sequelize.STRING,
        allowNull: false
      },
      precoPromocionalTranslado:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      precoOriginalTranslado:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tituloTranslado:{
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt:{
        type: Sequelize.DATE,         
      },
      updatedAt:{
        type: Sequelize.DATE
      },
      deletedAt:{
        type: Sequelize.DATE
      }
     });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('translados');
  }
};
