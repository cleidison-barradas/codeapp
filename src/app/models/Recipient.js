import { Model, DataTypes } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.STRING,
        complement: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        zip_code: DataTypes.INTEGER
      },
      {
        sequelize
      }
    );
    return this;
  }
}
export default Recipient;
