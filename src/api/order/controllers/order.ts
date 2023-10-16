/**
 * order controller
 */

import { factories } from '@strapi/strapi'
// export default factories.createCoreController('api::order.order');

// // https://docs.strapi.io/dev-docs/plugins/email
export default factories.createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        const { data } = await super.create(ctx);
        try {
            const entity = await strapi.db.query('api::order.order').findOne({
                where: { id: data.id },
                populate: ['customer', 'items']
            });

            console.log(entity, "entity")

            await strapi.plugins['email'].services.email.send({
                to: entity.customer.email,
                from: '1000kaktusu@gmail.com',
                // cc: '1000kaktusu@gmail.com',
                // bcc: '1000kaktusu@gmail.com',
                replyTo: 'info@localshop.lt',
                subject: `order #${entity.id}`,
                text: `Hi, ${entity.customer.firstName}, your order created`,
                // html: `Hi, ${entity.customer.firstName}, your order created.`,
            })

        } catch (error) {
            console.log(error, "error on order create");
        }

        return { data };
    }
}));
