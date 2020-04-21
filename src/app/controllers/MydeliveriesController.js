import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class MydeliveriesController {
  async index(req, res) {
    const { deliveryman_id } = req.params;

    const mydeliveries = await Delivery.findAll({
      attributes: ['id', 'product'],
      where: {
        deliveryman_id,
        end_date: null,
        canceled_at: null
      },
      include: [
        {
          model: Recipient,
          as: 'recipients',
          attributes: ['name', 'state', 'city', 'street', 'number', 'zip_code']
        }
      ]
    });
    return res.json(mydeliveries);
  }
}
export default new MydeliveriesController();
