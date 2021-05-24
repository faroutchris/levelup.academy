'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const entities = await strapi.query('topic').model.fetchAll({
      columns: ['id', 'published_at', 'created_at', 'updated_at', 'title', 'user'],
      withRelated: ['user'],
    });

    return entities.map((entity) => sanitizeEntity(entity, { model: strapi.models.topic }));
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi
      .query('topic')
      .model.query((qb) => {
        qb.where({ id: id });
      })
      .fetch({
        columns: ['id', 'published_at', 'created_at', 'updated_at', 'title', 'post', 'user'],
        withRelated: ['user'],
      });

    return sanitizeEntity(entity, { model: strapi.models.topic });
  },
};
