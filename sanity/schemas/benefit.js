export default {
  name: 'benefit',
  title: 'Benefits',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Benefit Title',
      type: 'localeString',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
      validation: Rule => Rule.required(),
    },
    {
      name: 'icon',
      title: 'SVG Icon',
      type: 'text',
      description: 'Paste the complete SVG code for the icon',
      validation: Rule => Rule.required(),
    },
    {
      name: 'items',
      title: 'Benefit Items',
      type: 'array',
      of: [{ type: 'localeString' }],
      description: 'List of specific benefits (shown with checkmarks)',
      validation: Rule => Rule.required().min(2).max(5),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this benefit appears',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare(selection) {
      const { title, order } = selection;
      return {
        title: title?.en || title?.es || 'Benefit',
        subtitle: typeof order === 'number' ? `Order: ${order}` : undefined,
      };
    },
  },
};
