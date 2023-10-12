/**
 * order controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::order.order', ({strapi})=> ({
    async create(ctx){
        // const entity = await strapi.db.query('api::order.order').create(ctx);
        await strapi.plugins['email'].services.email.send({
            to: ctx.request.body.data.customer.email,
            from: '1000kaktusu@gmail.com', //e.g. single sender verification in SendGrid
            // cc: '1000kaktusu@gmail.com',
            // bcc: '1000kaktusu@gmail.com',
            replyTo: 'hello@danielius.online',
            subject: 'order created',
            text: `Hi, ${ctx.request.body.data.customer.firstName}, your order created`,
            html: 'order created',
        })
        console.log(ctx.request.body, "ctx.request.body");
        console.log(ctx.response, "ctx.response");
        
        // console.log(strapi,entity, "created");
       return ctx
    },
    async post(ctx){
        console.log(ctx, "posted");
        const entity = await strapi.db.query('api::order.order').findMany({
            populate: ['customer','items']
        });
        await strapi.plugins['email'].services.email.send({
            to: '1000kaktusu@gmail.com',
            from: '1000kaktusu@gmail.com', //e.g. single sender verification in SendGrid
            cc: '1000kaktusu@gmail.com',
            bcc: '1000kaktusu@gmail.com',
            replyTo: '1000kaktusu@gmail.com',
            subject: 'order posted',
            text: 'order posted',
            html: 'order posted',
          })
        return this.transformResponse(entity,ctx);
    },
    async find(ctx){
        const entity = await strapi.db.query('api::order.order').findMany({
                populate: ['customer','items']
            });
            await strapi.plugins['email'].services.email.send({
                to: '1000kaktusu@gmail.com',
                from: '1000kaktusu@gmail.com', //e.g. single sender verification in SendGrid
                cc: '1000kaktusu@gmail.com',
                bcc: '1000kaktusu@gmail.com',
                replyTo: '1000kaktusu@gmail.com',
                subject: 'orders found',
                text: 'orders found',
                html: 'orders found',
              })
        console.log(entity, "find");
        return this.transformResponse(entity,ctx);
    }

    
}));


// await strapi.plugins['email'].services.email.send({
//     to: 'valid email address',
//     from: 'your verified email address', //e.g. single sender verification in SendGrid
//     cc: 'valid email address',
//     bcc: 'valid email address',
//     replyTo: 'valid email address',
//     subject: 'The Strapi Email plugin worked successfully',
//     text: 'Hello world!',
//     html: 'Hello world!',
//   })


// export default {
//     async afterCreate(event) {    // Connected to "Save" button in admin panel
//         const { result } = event;

//         try{
//             await strapi.plugins['email'].services.email.send({
//               to: 'valid email address',
//               from: 'your verified email address', // e.g. single sender verification in SendGrid
//               cc: 'valid email address',
//               bcc: 'valid email address',
//               replyTo: 'valid email address',
//               subject: 'The Strapi Email plugin worked successfully',
//               text: '${fieldName}', // Replace with a valid field ID
//               html: 'Hello world!', 
                
//             })
//         } catch(err) {
//             console.log(err);
//         }
//     }
// }

// import { factories } from '@strapi/strapi';
// import Shopify from 'shopify-api-node';

// const shopify = new Shopify({
//     shopName: process.env.SHOPIFY_SECRET_SHOPNAME,
//     accessToken: process.env.SHOPIFY_SECRET_API
// });

// export default factories.createCoreController('api::order.order', ({ strapi }) => ({
//     // async find(ctx) {
//     //     const sanitizedQueryParams = await this.sanitizeQuery(ctx);
//     //     const { results, pagination } = await strapi.service('api::order.order').find(sanitizedQueryParams);
//     //     const sanitizedResults = await this.sanitizeOutput(results, ctx);

//     //     return this.transformResponse(sanitizedResults, { pagination });
//     // },
//     async findOne(ctx) {
//         const { id } = ctx.params;

//         const entity = await strapi.db.query('api::order.order').findOne({
//             where: { slug: id },
//         });

//         console.log();
        
//         // entity.shopify = await shopify.product.get(entity.shopifyID)

//         const sanitizedResults = await this.sanitizeOutput(entity, ctx);

//         return this.transformResponse(sanitizedResults, { model: strapi.getModel('api::product:product') });
//     }
// }));

