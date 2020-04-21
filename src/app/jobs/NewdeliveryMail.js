import Mail from '../../lib/Mail';

class NewdeliveryMail {
    get key() {
        return 'NewdeliveryMail';
    }

    async handle({ data }) {
        const { checkDeliveryMan, checkRecipient, delivery } = data;

        await Mail.sendMail({
            to: `${checkDeliveryMan.name} <${checkDeliveryMan.email}>`,
            subject: 'Nova entrega cadastrada',
            template: 'newdelivery',
            context: {
                deliveryman: checkDeliveryMan.name,
                product: delivery.product,
                street: checkRecipient.street,
                number: checkRecipient.number,
                state: checkRecipient.state,
                city: checkRecipient.city
            }
        });
    }
}
export default new NewdeliveryMail();
