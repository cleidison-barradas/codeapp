import { Op } from 'sequelize';
import Recipients from '../models/Recipient';
import Delivery from '../models/Delivery';

import User from '../models/User';

class RecipientController {
  async index(req, res) {
    const { textsearch } = req.query;
    const { is_admin } = await User.findByPk(req.User_id);

    if (!is_admin) {
      return res.status(401).json({ error: 'User does not permission' });
    }
    const recipients = await Recipients.findAll({
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
        'zip_code'
      ],
      where: {
        name: { [Op.iLike]: textsearch ? `%${textsearch}%` : '%%' }
      },
      order: ['id']
    });
    return res.json(recipients);
  }

  async store(req, res) {
    const { is_admin } = await User.findByPk(req.User_id);

    if (!is_admin) {
      return res.status(401).json({ error: 'user does not have permission' });
    }
    const recipient = await Recipients.create(req.body);

    return res.json(recipient);
  }

  async show(req, res) {
    const { id } = req.params;

    const recipient = await Recipients.findByPk(id);

    return res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;
    const recipient = await Recipients.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not found' });
    }
    await recipient.update(req.body);

    return res.json(recipient);
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipients.findByPk(id);

    const delivery = await Delivery.findAll({
      where: {
        recipient_id: id
      }
    });
    if (delivery) {
      return res
        .status(400)
        .json({ error: 'Exists deliveries with this recipient' });
    }

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not found' });
    }
    await recipient.destroy();

    return res.json(recipient);
  }
}
export default new RecipientController();
