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
            const orderReceivedTemplate = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/mails/order-received/email?id=${data.id}`
            )

            await strapi.plugins['email'].services.email.send({
                to: entity.customer.email,
                from: process.env.SMTP_USERNAME,
                replyTo: process.env.SMTP_USERNAME,
                subject: `Order received #${entity.id}`,
                html: orderReceivedTemplate.data,
            })

        } catch (error) {
            console.log(error, "error on order create");
        }

        return { data };
    }
}));
