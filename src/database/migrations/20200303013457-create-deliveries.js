/* eslint-disable linebreak-style */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('deliveries', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            recipient_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'recipients',
                    key: 'id',
                    OnDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            },
            deliveryman_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'deliverymans',
                    key: 'id',
                    OnDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            },
            product: {
                type: Sequelize.STRING,
                allowNull: false
            },
            canceled_at: {
                type: Sequelize.DATE
            },
            start_date: {
                type: Sequelize.DATE
            },
            end_date: {
                type: Sequelize.DATE
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
        return queryInterface.dropTable('deliveries');
    }
};
