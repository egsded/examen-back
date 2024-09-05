const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
    idClientes: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidoPaterno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidoMaterno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correoElectronico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idDomicilio: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'clientes',
});

module.exports = Cliente;