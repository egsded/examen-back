const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Colonia = sequelize.define('Colonia', {
    idColonia: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'colonias',
});

module.exports = Colonia;