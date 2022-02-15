module.exports = (sequelize, DataTypes) => {
    const Translado = sequelize.define("Translado", {
        transporta_pet: DataTypes.STRING(10),
        acessivel_deficiente: DataTypes.STRING(10),
        levar_bagagens: DataTypes.STRING(10),
        recolhe_hotel: DataTypes.STRING(10),
        preco_original: DataTypes.STRING(255),
        preco_promocional: DataTypes.STRING(255),
        titulo: DataTypes.STRING(200),
        descricao: DataTypes.STRING(250),
        imagem: DataTypes.STRING(10)
    }, {
        tableName: "translados",
        timestamps: true,
        paranoid: true
    });
    return Translado
}