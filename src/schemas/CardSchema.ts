export default {
  name: 'Card',
  primaryKey: '_id',
  properties: {
    _id: {
      type: 'string',
      indexed: true,
    },
    title: 'string',
    description: 'string?',
    deadline: 'date?',
    items: 'Item[]',
    created_at: { type: 'date', default: new Date(), optional: true },
  },
};
