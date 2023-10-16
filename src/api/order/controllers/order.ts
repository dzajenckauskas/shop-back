/**
 * order controller
 */

import { factories } from '@strapi/strapi'
import axios from 'axios';
// export default factories.createCoreController('api::order.order');

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        const { data } = await super.create(ctx);
        try {
            const entity = await strapi.db.query('api::order.order').findOne({
                where: { id: data.id },
                populate: ['customer', 'items']
            });
            const orderTemplate = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/mails/order-received/email?id=${data.id}`
            )

            await strapi.plugins['email'].services.email.send({
                to: entity.customer.email,
                from: '1000kaktusu@gmail.com',
                replyTo: 'info@localshop.lt',
                subject: `Order received #${entity.id}`,
                html: orderTemplate.data,
            })

        } catch (error) {
            console.log(error, "error on order create");
        }

        return { data };
    }
}));
