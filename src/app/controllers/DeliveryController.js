import * as Yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import NewdeliveryMail from '../jobs/NewdeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const { textsearch } = req.query;

    const searchdelivery = await Delivery.findAll({
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      where: {
        product: { [Op.iLike]: textsearch ? `%${textsearch}%` : '%%' }
      },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'deliveryman_avatar',
              attributes: ['id', 'url', 'path']
            }
          ]
        },
        {
          model: Recipient,
          as: 'recipients',
          attributes: ['id', 'name', 'street', 'city', 'state']
        }
      ]
    });
    return res.json(searchdelivery);
  }

  async show(req, res) {
    const { delivery_id } = req.params;

    const delivery = await Delivery.findByPk(delivery_id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }
    return res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
      product: Yup.string().required(),
      start_date: Yup.date()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fields fails' });
    }

    const { recipient_id } = req.body;
    const checkRecipient = await Recipient.findByPk(recipient_id);
    if (!checkRecipient) {
      return res.status(400).json({ error: 'Recipient does not found' });
    }

    const { deliveryman_id } = req.body;
    const checkDeliveryMan = await Deliveryman.findByPk(deliveryman_id);
    if (!checkDeliveryMan) {
      return res.status(400).json({ error: 'Deliveryman does not found' });
    }

    const delivery = await Delivery.create(req.body);

    // Notification DeliveryMan

    await Queue.add(NewdeliveryMail.key, {
      delivery,
      checkRecipient,
      checkDeliveryMan
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const { delivery_id } = req.params;

    const deliveryEdit = await Delivery.findByPk(delivery_id);
    if (!deliveryEdit) {
      return res.status(401).json({ error: 'Delivery does not exists' });
    }
    await deliveryEdit.update(req.body);

    return res.json(deliveryEdit);
  }

  async delete(req, res) {
    const { delivery_id } = req.params;
    const deliveryEdit = await Delivery.findByPk(delivery_id);

    if (!deliveryEdit) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }
    await deliveryEdit.destroy();

    return res.json();
  }
}
export default new DeliveryController();