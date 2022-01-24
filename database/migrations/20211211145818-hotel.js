'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hoteis', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      hotel_nome:{
        type: Sequelize.STRING,
        allowNull: false
      },
      hotel_tipo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      hotel_telefone:{
       type: Sequelize.STRING,
       allowNull: false
      },
      hotel_quantidade_unidades:{
       type: Sequelize.STRING,
       allowNull: false
      },
      hotel_categoria_unidades:{
        type: Sequelize.STRING,
        allowNull: false
      },
      hotel_horario_check_in:{
        type: Sequelize.DATE,
        allowNull: false
      },
      hotel_horario_check_out:{
        type: Sequelize.DATE,
        allowNull: false
      },
      hotel_imagem:{
        type: Sequelize.STRING,
        allowNull: false
      },
      hotel_facilidades:{
        type: Sequelize.STRING,
        allowNull: false
      },
      hotel_endereco:{
        type: Sequelize.STRING,
        allowNull: false
      },
      hotel_endereco_numero:{
        type: Sequelize.STRING,
        allowNull: false
      },
      hotel_endereco_cidade:{
        type: Sequelize.STRING,
        allowNull: false
      },
      hotel_endereco_bairro:{
        type: Sequelize.STRING,
        allowNull: false
      },
      hotel_endereco_estado:{
        type: Sequelize.STRING,
        allowNull: false
      },
      hotel_endereco_cep:{
        type: Sequelize.STRING,
        allowNull: false
      },
      
      hotel_email:{
        type: Sequelize.STRING,
        allowNull: false
      },      
      hotel_preco:{
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
    await queryInterface.dropTable('hoteis');
  }
};