'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.changeColumn('Users', 'first_name', {
            type: Sequelize.STRING,
            allowNull: true,
        })

        await queryInterface.changeColumn('Users', 'last_name', {
            type: Sequelize.STRING,
            allowNull: true,
        })

        await queryInterface.addColumn('Users', 'has_pet', {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        })

        await queryInterface.addColumn('Users', 'pet_name', {
            type: Sequelize.STRING,
            allowNull: true,
        })

        await queryInterface.addColumn('Users', 'has_liked_music_genre', {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        })

        await queryInterface.addColumn('Users', 'liked_music_genre', {
            type: Sequelize.STRING,
            allowNull: true,
        })

        await queryInterface.addColumn('Users', 'has_most_liked_place', {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        })

        await queryInterface.addColumn('Users', 'most_liked_place', {
            type: Sequelize.STRING,
            allowNull: true,
        })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('Users', 'has_pet')
        await queryInterface.removeColumn('Users', 'pet_name')
        await queryInterface.removeColumn('Users', 'has_liked_music_genre')
        await queryInterface.removeColumn('Users', 'liked_music_genre')
        await queryInterface.removeColumn('Users', 'has_most_liked_place')
        await queryInterface.removeColumn('Users', 'most_liked_place')

        await queryInterface.changeColumn('Users', 'first_name', {
            type: Sequelize.STRING,
            allowNull: false,
        })

        await queryInterface.changeColumn('Users', 'last_name', {
            type: Sequelize.STRING,
            allowNull: false,
        })
    },
}
