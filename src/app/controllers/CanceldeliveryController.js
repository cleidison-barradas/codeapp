import Delivery from '../models/Delivery';
import DeliveryMan from '../models/Deliveryman';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class CanceldeliveryController {
  async update(req, res) {
    const { id } = req.params;

    const deliveryUpdate = await Delivery.findOne({
      where: {
        id,
        canceled_at: null
      },
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email']
        }
      ]
    });
    if (!deliveryUpdate) {
      return res.status(400).json({ error: 'Delivery has been canceled' });
    }

    deliveryUpdate.canceled_at = new Date();
    deliveryUpdate.save();

    await Queue.add(CancellationMail.key, {
      deliveryUpdate
    });

    return res.json(deliveryUpdate);
  }
}
export default new CanceldeliveryController();
