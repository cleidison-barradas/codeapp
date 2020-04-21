import { Op } from 'sequelize';
import DeliveryProblems from '../models/DeliveryProblems';
import Delivery from '../models/Delivery';

class DeliveryProblemsController {
  async index(req, res) {
    const deliveryProblem = await DeliveryProblems.findAll({
      where: {
        delivery_id: { [Op.not]: null }
      },
      attributes: ['description'],
      include: [
        {
          model: Delivery,
          as: 'problem'
        }
      ]
    });

    return res.json(deliveryProblem);
  }

  async show(req, res) {
    const deliveryProblem = await DeliveryProblems.findAll({
      include: [
        {
          model: Delivery,
          as: 'problem'
        }
      ]
    });
    return res.json(deliveryProblem);
  }

  async store(req, res) {
    const deliveryProblem = await DeliveryProblems.create(req.body);
    return res.json(deliveryProblem);
  }
}
export default new DeliveryProblemsController();
