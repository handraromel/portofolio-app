'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.removeColumn('Users', 'has_liked_music_genre')
        await queryInterface.removeColumn('Users', 'has_most_liked_place')
        await queryInterface.removeColumn('Users', 'has_pet')
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.addColumn('Users', 'has_liked_music_genre', {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        })
        await queryInterface.addColumn('Users', 'has_most_liked_place', {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        })
        await queryInterface.addColumn('Users', 'has_pet', {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        })
    },
}
