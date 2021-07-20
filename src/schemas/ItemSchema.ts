export default {
  name: 'Item',
  primaryKey: '_id',
  properties: {
    _id: {
      type: 'string',
      indexed: true,
    },
    title: 'string',
    value: 'double',
    type: 'string',
    finished: { type: 'bool', default: false, optional: true },
  },
};
