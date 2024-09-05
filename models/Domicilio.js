const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Domicilio = sequelize.define('Domicilio', {
    idDomicilios: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    calle: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    numeroInterno: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    numeroExterno: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    idColonia: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'domicilios',
});


module.exports = Domicilio;