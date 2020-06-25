import Delivery from '../models/Delivery';

import Deliveryman from '../models/Deliveryman';

import File from '../models/File';

import Recipient from '../models/Recipient';

class MydeliveriesController {
  async index(req, res) {
    const { deliveryman_id } = req.params;

    const mydeliveries = await Delivery.findAll({
      where: {
        deliveryman_id,
        end_date: null,
        canceled_at: null
      },

      attributes: [
        'id',
        'product',
        'deliveryman_id',
        'canceled_at',
        'start_date',
        'end_date',
        'canceled_at',
        'createdAt'
      ],
      include: [
        {
          model: Recipient,
          as: 'recipients',
          attributes: [
            'id',
            'name',
            'state',
            'city',
            'street',
            'number',
            'zip_code'
          ]
        }
      ]
    });
    return res.json(mydeliveries);
  }

  async show(req, res) {
    const { deliveryman_id } = req.params;

    const deliverymanExist = await Deliveryman.findOne({
      where: { id: deliveryman_id },
      include: [
        {
          model: File,
          as: 'deliveryman_avatar',
          attributes: ['id', 'url', 'path']
        }
      ]
    });
    if (!deliverymanExist) {
      return res.status(400).json({ error: 'DeliveryMan does not exists!' });
    }
    return res.json(deliverymanExist);
  }
}
export default new MydeliveriesController();
