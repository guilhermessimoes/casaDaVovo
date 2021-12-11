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
      transporta_pet:{
        type: Sequelize.STRING,
        allowNull: false
      },
      acessivel_deficiente:{
       type: Sequelize.STRING,
       allowNull: false
      },
      levar_bagagens:{
       type: Sequelize.STRING,
       allowNull: false
      },
      recolhe_hotel:{
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao:{
        type: Sequelize.STRING,
        allowNull: false
      },
      preco_promocional:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      preco_original:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      titulo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      imagem:{
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
