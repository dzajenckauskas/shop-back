// export default {
//     async afterCreate(event) {    // Connected to "Save" button in admin panel
//         const { result, params } = event;
//         console.log(result, params.data.customer, 'result', 'params', "afterCreate");

//         try {
//             await strapi.plugins['email'].services.email.send({
//                 to: '1000kaktusu@gmail.com',
//                 from: '1000kaktusu@gmail.com',
//                 // cc: '1000kaktusu@gmail.com',
//                 // bcc: '1000kaktusu@gmail.com',
//                 replyTo: 'hello@danielius.online',
//                 subject: 'order created',
//                 text: `Hi, ctx.request.body.data.customer.firstName, your order created`,
//                 html: `Hi, ctx.request.body.data.customer.firstName, your order created.`,
//             })

//         } catch (error) {
//             console.log(error, "error on order create");
//         }
//     }
// }