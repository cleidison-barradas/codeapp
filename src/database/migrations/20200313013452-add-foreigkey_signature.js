/* eslint-disable linebreak-style */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('deliveries', 'signature_id', {
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
        return queryInterface.dropColumn('deliveries', 'signature_id');
    }
};
