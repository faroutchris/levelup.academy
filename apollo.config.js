module.exports = {
  client: {
    service: {
      name: 'directus',
      localSchemaFile: './grapqhql-schema.json',
      includes: ['./**/*.ts'],
    },
  }, // the name of your graph in Studio  }
};
