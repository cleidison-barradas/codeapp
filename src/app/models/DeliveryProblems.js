import { Model, DataTypes } from 'sequelize';

class DeliveryProblems extends Model {
    static init(sequelize) {
        super.init(
            {
                description: DataTypes.STRING
            },
            {
                sequelize
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Delivery, {
            foreignKey: 'delivery_id',
            as: 'problem'
        });
    }
}
export default DeliveryProblems;
