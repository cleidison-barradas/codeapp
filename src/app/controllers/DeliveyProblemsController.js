import DeliveryProblems from '../models/DeliveryProblems';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class DeliveryProblemsController {
  async index(req, res) {
    const deliveryProblem = await DeliveryProblems.findAll({
      attributes: ['id', 'description', 'createdAt'],

      include: [
        {
          model: Delivery,
          as: 'delivery_problem',
          attributes: [
            'id',
            'product',
            'canceled_at',
            'start_date',
            'end_date'
          ],
          include: [
            {
              model: Recipient,
              as: 'recipients',
              attributes: [
                'id',
                'name',
                'street',
                'number',
                'complement',
                'state',
                'city'
              ]
            },
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email']
            }
          ]
        }
      ]
    });

    return res.json(deliveryProblem);
  }

  async show(req, res) {
    const { delivery_id } = req.params;
    const deliveryProblem = await DeliveryProblems.findAll({
      attributes: ['id', 'description', 'createdAt'],
      where: {
        delivery_id
      },
      include: [
        {
          model: Delivery,
          as: 'delivery_problem',
          attributes: [
            'id',
            'product',
            'canceled_at',
            'start_date',
            'end_date'
          ],
          include: [
            {
              model: Recipient,
              as: 'recipients',
              attributes: [
                'id',
                'name',
                'street',
                'number',
                'complement',
                'state',
                'city'
              ]
            },
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email']
            }
          ]
        }
      ]
    });

    return res.json(deliveryProblem);
  }

  async store(req, res) {
    const { delivery_id } = req.params;
    const { description } = req.body;
    const data = { description, delivery_id };
    const deliveryProblem = await DeliveryProblems.create(data);

    return res.json(deliveryProblem);
  }
}

export default new DeliveryProblemsController();
