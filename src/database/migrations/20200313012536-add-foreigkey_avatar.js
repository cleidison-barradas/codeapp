/* eslint-disable linebreak-style */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('deliverymans', 'avatar_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'files',
                key: 'id',
                OnDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        });
    },
    down: queryInterface => {
        return queryInterface.dropColumn('deliverymans', 'avatar_id');
    }
};
