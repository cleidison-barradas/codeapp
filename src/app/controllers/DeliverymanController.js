import * as Yup from 'yup';
import { Op } from 'sequelize';
import DeliveryMan from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { textsearch } = req.query;

    const Deliveryman = await DeliveryMan.findAll({
      attributes: ['id', 'name', 'email'],
      where: {
        name: { [Op.iLike]: textsearch ? `%${textsearch}%` : '%%' }
      },
      include: [
        {
          model: File,
          as: 'deliveryman_avatar',
          attributes: ['id', 'url', 'path']
        }
      ]
    });
    res.json(Deliveryman);
  }

  async show(req, res) {
    const { deliveryman_id } = req.params;
    const deliveryman = await DeliveryMan.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'User does not exists' });
    }
    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fields fails' });
    }

    const newdeliveryman = await DeliveryMan.create(req.body);

    return res.json(newdeliveryman);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fields fails' });
    }

    const { deliveryman_id } = req.params;

    const deliveryman = await DeliveryMan.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'User does not found' });
    }

    await deliveryman.update(req.body);

    return res.json(deliveryman);
  }

  async delete(req, res) {
    const { deliveryman_id } = req.params;

    const deliveryman = await DeliveryMan.findByPk(deliveryman_id);
    const delivery = await Delivery.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not found' });
    }
    if (delivery) {
      return res
        .status(400)
        .json({ error: 'Deliveryman has must no deliveries' });
    }

    await deliveryman.destroy();

    return res.json(deliveryman);
  }
}
export default new DeliverymanController();
