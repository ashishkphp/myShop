import type { Schema, Struct } from '@strapi/strapi';

export interface FaqsFaQs extends Struct.ComponentSchema {
  collectionName: 'components_faqs_fa_qs';
  info: {
    displayName: 'FAQs';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    question: Schema.Attribute.String;
  };
}

export interface ServicesServicesList extends Struct.ComponentSchema {
  collectionName: 'components_services_services_lists';
  info: {
    description: '';
    displayName: 'Services List';
  };
  attributes: {
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String;
    serviceimage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    servicelink: Schema.Attribute.String;
  };
}

export interface SuburbsSuburbList extends Struct.ComponentSchema {
  collectionName: 'components_suburbs_suburb_lists';
  info: {
    description: '';
    displayName: 'Suburb List';
  };
  attributes: {
    link: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'faqs.fa-qs': FaqsFaQs;
      'services.services-list': ServicesServicesList;
      'suburbs.suburb-list': SuburbsSuburbList;
    }
  }
}
