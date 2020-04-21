/* eslint-disable linebreak-style */
module.exports = {
    up: queryInterface => {
        return queryInterface.removeColumn('deliverymans', 'avatar_id');
    }
};
