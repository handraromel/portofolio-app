const { DataTypes, UUIDV4 } = require('sequelize')
const { sequelize } = require('@api/utils')

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        has_pet: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        pet_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        has_liked_music_genre: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        liked_music_genre: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        has_most_liked_place: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        most_liked_place: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        feel_score: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        verificationToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = User
