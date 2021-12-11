'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('restaurantes', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      restaurante_nome:{
        type: Sequelize.STRING,
        allowNull: false
      },
      restaurante_tipo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      restaurante_telefone:{
       type: Sequelize.STRING,
       allowNull: false
      },
      restaurante_email:{
       type: Sequelize.STRING,
       allowNull: false
      },
      restaurante_cardapio:{
        type: Sequelize.STRING,
        allowNull: false
      },
      restaurante_horario_funcionamento:{
        type: Sequelize.DATE,
        allowNull: false
      },
      restaurante_endereco:{
        type: Sequelize.STRING,
        allowNull: false
      },
      restaurante_endereco_numero:{
        type: Sequelize.STRING,
        allowNull: false
      },
      restaurante_endereco:{
        type: Sequelize.STRING,
        allowNull: false
      },
      restaurante_endereco_numero:{
        type: Sequelize.STRING,
        allowNull: false
      },
      restaurante_endereco_numero_complemento:{
        type: Sequelize.STRING,
        allowNull: false
      },
      restaurante_endereco_bairro:{
        type: Sequelize.STRING,
        allowNull: false
      },
      restaurante_endereco_cidade:{
        type: Sequelize.STRING,
        allowNull: false
      },
      restaurante_endereco_estado:{
        type: Sequelize.STRING,
        allowNull: false
      },
      restaurante_endereco_cep:{
        type: Sequelize.STRING,
        allowNull: false
      },
      restaurante_imagem:{
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
    await queryInterface.dropTable('restaurantes');
  }
};
