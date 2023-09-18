import { factories } from '@strapi/strapi';
import Shopify from 'shopify-api-node';

const shopify = new Shopify({
    shopName: process.env.SHOPIFY_SECRET_SHOPNAME,
    accessToken: process.env.SHOPIFY_SECRET_API
});

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
    async find(ctx) {
        const sanitizedQueryParams = await this.sanitizeQuery(ctx);
        const { results, pagination } = await strapi.service('api::product.product').find(sanitizedQueryParams);
        const sanitizedResults = await this.sanitizeOutput(results, ctx);

        return this.transformResponse(sanitizedResults, { pagination });
    },
    async findOne(ctx) {
        const { id } = ctx.params;

        const entity = await strapi.db.query('api::product.product').findOne({
            where: { slug: id },
        });

        entity.shopify = await shopify.product.get(entity.shopifyID)

        const sanitizedResults = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedResults, { model: strapi.getModel('api::product:product') });
    }
}));

