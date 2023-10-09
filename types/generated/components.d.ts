import type { Schema, Attribute } from '@strapi/strapi';

export interface BannerBanner extends Schema.Component {
  collectionName: 'components_banner_banners';
  info: {
    displayName: 'Banner';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    description: Attribute.RichText;
    images: Attribute.Media;
  };
}

export interface CustomerCustomer extends Schema.Component {
  collectionName: 'components_customer_customers';
  info: {
    displayName: 'customer';
    description: '';
  };
  attributes: {
    firstName: Attribute.String;
    lastName: Attribute.String;
    phone: Attribute.String;
    email: Attribute.String;
    isBusiness: Attribute.Boolean;
    vatNumber: Attribute.String;
    businessName: Attribute.String;
  };
}

export interface ItemsItems extends Schema.Component {
  collectionName: 'components_items_items';
  info: {
    displayName: 'items';
  };
  attributes: {
    quantity: Attribute.Integer;
    lineTotal: Attribute.Float;
    price: Attribute.Float;
    originalPrice: Attribute.Float;
    product: Attribute.Component<'product.product'>;
  };
}

export interface ProductProduct extends Schema.Component {
  collectionName: 'components_product_products';
  info: {
    displayName: 'Product';
  };
  attributes: {
    title: Attribute.String;
    slug: Attribute.String & Attribute.Required & Attribute.Unique;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'banner.banner': BannerBanner;
      'customer.customer': CustomerCustomer;
      'items.items': ItemsItems;
      'product.product': ProductProduct;
    }
  }
}
