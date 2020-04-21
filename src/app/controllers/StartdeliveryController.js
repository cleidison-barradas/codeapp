import {
    isWithinInterval,
    setHours,
    startOfHour,
    startOfDay,
    endOfDay
} from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

class StartdeliveryController {
    async update(req, res) {
        const currentDate = new Date();
        if (
            !isWithinInterval(currentDate, {
                start: startOfHour(setHours(currentDate, 8)),
                end: startOfHour(setHours(currentDate, 18))
            })
        )
            return res.status(401).json({
                error: 'Not permited, deliveries only between 08:00h and 18:00h'
            });

        const { id } = req.params;
        const delivery = await Delivery.findByPk(id);
        if (!delivery) {
            return res.status(400).json({ error: 'Delivery does not exists' });
        }
        const deliverymanWithdrawals = await Delivery.count({
            where: delivery.deliveryman_id,
            start_date: {
                [Op.between]: [startOfDay(new Date()), endOfDay(new Date())]
            }
        });
        if (deliverymanWithdrawals > 5) {
            return res
                .status(400)
                .json({ error: 'Only 5 withdrawals are allowed' });
        }
        delivery.start_date = new Date();
        delivery.save();

        return res.json(delivery);
    }
}
export default new StartdeliveryController();
