import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveredOrdersController {
  async index(req, res) {
    const { deliveryman_id } = req.params;
    const mydeliveries = await Delivery.findAll({
      attributes: ['product', 'start_date', 'end_date', 'canceled_at'],
      where: {
        deliveryman_id,
        end_date: { [Op.not]: null }
      },
      include: [
        {
          model: Recipient,
          as: 'recipients',
          attributes: ['name', 'state', 'city', 'street', 'number', 'zip_code']
        },
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'url']
        }
      ]
    });
    return res.json(mydeliveries);
  }
}
export default new DeliveredOrdersController();
