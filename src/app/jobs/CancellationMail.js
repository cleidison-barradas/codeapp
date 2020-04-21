import Mail from '../../lib/Mail';

class CancellationMail {
    get key() {
        return 'CancellationMail';
    }

    async handle({ data }) {
        const { deliveryUpdate } = data;

        await Mail.sendMail({
            to: `${deliveryUpdate.deliveryman.name} <${deliveryUpdate.deliveryman.email}>`,
            subject: 'Cancelamento de entrega',
            template: 'cancellationdelivery',
            context: {
                delivery_id: deliveryUpdate.id,
                deliveryman: deliveryUpdate.deliveryman.name,
                product: deliveryUpdate.product,
                canceled_at: deliveryUpdate.canceled_at
            }
        });
    }
}
export default new CancellationMail();
