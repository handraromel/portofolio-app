const { DataTypes } = require('sequelize')
const { sequelize } = require('@api/utils')

const Feedback = sequelize.define(
    'Feedback',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
    },
    {
        timestamps: true,
    }
)

Feedback.associate = (models) => {
    Feedback.belongsTo(models.User, { foreignKey: 'userId' })
}

module.exports = Feedback
