module.exports = (sequelize, DataTypes) => {
    const Restaurante = sequelize.define("Restaurante", {
        restaurante_tipo: DataTypes.STRING(40),
        restaurante_nome: DataTypes.STRING(40),
        restaurante_telefone: DataTypes.STRING(40),
        restaurante_email: DataTypes.STRING(40),
        restaurante_cardapio: DataTypes.STRING(40),
        restaurante_horario_funcionamento: DataTypes.DATE,
        restaurante_endereco: DataTypes.STRING(40),        
        restaurante_endereco_numero: DataTypes.STRING(40),
        restaurante_endereco_numero_complemento: DataTypes.STRING(40),
        restaurante_endereco_bairro: DataTypes.STRING(40),
        restaurante_endereco_cidade: DataTypes.STRING(40),
        restaurante_endereco_estado: DataTypes.STRING(40),
        restaurante_endereco_cep: DataTypes.STRING(40),        
        restaurante_imagem: DataTypes.STRING(40),        
        }, {
        tableName: "restaurantes",
        timestamps: true,
        paranoid: true
    });
    return Restaurante
}