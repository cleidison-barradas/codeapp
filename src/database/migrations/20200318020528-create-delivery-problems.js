/* eslint-disable linebreak-style */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('delivery_problems', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            delivery_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'deliveries',
                    key: 'id',
                    OnDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            },
            description: {
                type: Sequelize.STRING,
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
        return queryInterface.dropTable('delivery_problems');
    }
};
