
module.exports = (sequelize, DataTypes) => {
    const Passeio = sequelize.define("Passeio", {
        passeio_titulo: DataTypes.STRING(40),
        passeio_descricao: DataTypes.STRING(40),
        passeio_lugar: DataTypes.STRING(40),
        passeio_rua: DataTypes.STRING(40),
        passeio_cidade: DataTypes.STRING(40),
        passeio_estado: DataTypes.STRING(40),
        passeio_cep: DataTypes.STRING(40),
        passeio_horario: DataTypes.DATE,
        passeio_data: DataTypes.DATE,
        passeio_valor: DataTypes.STRING(40),
        passeio_imagem: DataTypes.STRING(40),
        passeio_preco_promocional: DataTypes.STRING(40),
        }, {
        tableName: "passeios",
        timestamps: true,
        paranoid: true
    });
    return Passeio
}
