module.exports = (sequelize, DataTypes) => {
    const Translado = sequelize.define("Translado", {
        transportaPet: DataTypes.STRING(10),
        acessivelDeficiente: DataTypes.STRING(10),
        levarBagagens: DataTypes.STRING(10),
        recolheHotel: DataTypes.STRING(10),
        precoOriginalTranslado: DataTypes.INTEGER,
        precoPromocionalTranslado: DataTypes.INTEGER,
        tituloTranslado: DataTypes.STRING(200),
        descricao: DataTypes.STRING(10),
        imagemTranslado: DataTypes.STRING(10)
    }, {
        tableName: "translados",
        timestamps: true,
        paranoid: true
    });
    return Translado
}