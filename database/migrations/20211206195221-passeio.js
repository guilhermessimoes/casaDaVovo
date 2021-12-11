'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('passeios', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      passeio_titulo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      passeio_descricao:{
       type: Sequelize.STRING,
       allowNull: false
      },
      passeio_lugar:{
       type: Sequelize.STRING,
       allowNull: false
      },
      passeio_rua:{
        type: Sequelize.STRING,
        allowNull: false
       },
       passeio_cidade:{
        type: Sequelize.STRING,
        allowNull: false
       },
       passeio_cep:{
        type: Sequelize.STRING,
        allowNull: false
       },
       passeio_estado:{
        type: Sequelize.STRING,
        allowNull: false
       },
      passeio_data:{
        type: Sequelize.DATE,
        allowNull: false
      },
      passeio_horario:{
        type: Sequelize.DATE,
        allowNull: false
      },
      passeio_valor:{
        type: Sequelize.STRING,
        allowNull: false
      },
      passeio_imagem:{
        type: Sequelize.STRING,
        allowNull: false
      },
      passeio_preco_promocional:{
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('passeios');
  }
};
