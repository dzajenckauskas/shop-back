/**
 * order controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        const status = ctx.response.header.status
        try {
            if (status === 200) {
                await strapi.plugins['email'].services.email.send({
                    to: ctx.request.body.data.customer.email,
                    from: '1000kaktusu@gmail.com',
                    // cc: '1000kaktusu@gmail.com',
                    // bcc: '1000kaktusu@gmail.com',
                    replyTo: 'hello@danielius.online',
                    subject: 'order created',
                    text: `Hi, ${ctx.request.body.data.customer.firstName}, your order created`,
                    html: `Hi, ${ctx.request.body.data.customer.firstName}, your order created.`,
                })
            }

        } catch (error) {
            console.log(error, "error on order create");
        }

        console.log(ctx.response.header.status, "ctx.response.header.status");

        return ctx
    }
}));
