/**
 * product router
 */


// export default factories.createCoreRouter('api::product.product');



const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::product.product");