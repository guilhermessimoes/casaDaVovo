module.exports = (sequelize, DataTypes) => {
    const Hotel = sequelize.define("Hotel", {
        hotel_tipo: DataTypes.STRING(40),
        hotel_nome: DataTypes.STRING(40),
        hotel_telefone: DataTypes.STRING(40),
        hotel_quantidade_unidades: DataTypes.STRING(40),
        hotel_categoria_unidades: DataTypes.STRING(40),
        hotel_horario_check_in: DataTypes.DATE,
        hotel_horario_check_out: DataTypes.DATE,        
        hotel_facilidades: DataTypes.STRING(40),
        hotel_endereco: DataTypes.STRING(40),
        hotel_endereco_numero: DataTypes.STRING(40),
        hotel_endereco_cidade: DataTypes.STRING(40),
        hotel_endereco_estado: DataTypes.STRING(40),
        hotel_endereco_bairro: DataTypes.STRING(40),
        hotel_endereco_cep: DataTypes.STRING(40),
        hotel_imagem: DataTypes.STRING(40),
        hotel_email: DataTypes.STRING(40),
        hotel_preco: DataTypes.STRING(40),
        }, {
        tableName: "hoteis",
        timestamps: true,
        paranoid: true
    });
    return Hotel
}