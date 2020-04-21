/* eslint-disable linebreak-style */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('recipients', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            street: {
                type: Sequelize.STRING,
                allowNull: false
            },
            number: {
                type: Sequelize.STRING,
                allowNull: false
            },
            complement: {
                type: Sequelize.STRING
            },
            state: {
                type: Sequelize.STRING,
                allowNull: false
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false
            },
            zip_code: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('recipients');
    }
};
