export default {
  name: 'User',
  primaryKey: '_id',
  properties: {
    _id: {
      type: 'string',
      indexed: true,
    },
    name: 'string',
    theme: 'string',
    os: 'string',
    created_at: { type: 'date', default: new Date(), optional: true },
  },
};
