'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const entities = await strapi
      .query('comment')
      .model.query((qb) => {
        qb.where({ topic: ctx.params.topicId });
      })
      .fetchAll({
        columns: ['id', 'published_at', 'created_at', 'updated_at', 'body', 'user'],
        withRelated: ['topic'],
      });

    return entities.map((entity) => sanitizeEntity(entity, { model: strapi.models.comment }));
  },

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.restaurant.create(data, { files });
    } else {
      console.log('params', ctx.params);
      ctx.request.body.user = ctx.state.user.id;
      ctx.request.body.topic = ctx.params.topicId;
      entity = await strapi.services.comment.create(ctx.request.body);
    }

    let comment = sanitizeEntity(entity, { model: strapi.models.comment });

    if (comment.user && comment.user.paidCourses) {
      delete comment.user.paidCourses;
    }

    return comment;
  },
};
