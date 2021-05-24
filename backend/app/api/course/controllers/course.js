'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const entities = await strapi.query('course').model.fetchAll({
      columns: [
        'id',
        'published_at',
        'created_at',
        'updated_at',
        'lesson',
        'title',
        'slug',
        'release',
      ],
      withRelated: ['lessons', 'heroImage'],
    });

    return entities.map((entity) => sanitizeEntity(entity, { model: strapi.models.course }));
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi
      .query('course')
      .model.query((qb) => {
        qb.where({ slug: id });
      })
      .fetch({
        columns: [
          'id',
          'published_at',
          'created_at',
          'updated_at',
          'lesson',
          'title',
          'slug',
          'release',
        ],
        withRelated: ['lessons', 'heroImage'],
      });

    return sanitizeEntity(entity, { model: strapi.models.course });
  },
};
