import Delivery from '../models/Delivery';

class FinishdeliveryController {
  async update(req, res) {
    const { id } = req.params;
    const deliveryEdit = await Delivery.findByPk(id);

    if (!deliveryEdit) {
      return res.status(400).json({ error: 'Delivery does not found' });
    }
    deliveryEdit.update(req.body);

    return res.json(deliveryEdit);
  }
}
export default new FinishdeliveryController();
