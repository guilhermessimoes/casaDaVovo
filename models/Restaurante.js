module.exports = (sequelize, DataTypes) => {
    const Restaurante = sequelize.define("Restaurante", {
        restaurante_nome: DataTypes.STRING(40),
        restaurante_tipo: DataTypes.STRING(40),
        restaurante_cozinha: DataTypes.STRING(40),
        restaurante_delivery: DataTypes.STRING(40),
        restaurante_bairro: DataTypes.STRING(40),
        restaurante_cidade: DataTypes.STRING(40),
        restaurante_estado: DataTypes.STRING(40),
        restaurante_telefone: DataTypes.STRING(40),
        restaurante_email: DataTypes.STRING(40),
        restaurante_descricao: DataTypes.STRING(250),       
        restaurante_imagem: DataTypes.STRING(40),        
        }, {
        tableName: "restaurantes",
        timestamps: true,
        paranoid: true
    });
    return Restaurante
}