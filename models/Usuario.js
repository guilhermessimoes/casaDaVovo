module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define("Usuario", {
        nome: DataTypes.STRING(40),
        email: DataTypes.STRING(40),
        senha: DataTypes.STRING(40),
       // confirm_senha: DataTypes.STRING(40)
    }, {
        tableName: "usuarios",
        timestamps: true,
        paranoid: true
    });
    return Usuario
}