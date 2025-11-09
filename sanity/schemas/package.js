export default {
  name: 'package',
  title: 'Packages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Package Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200),
    },
    {
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      description: 'Single emoji character (e.g., 🌸, ✨, 💕)',
      validation: Rule => Rule.required().max(4),
    },
    {
      name: 'price',
      title: 'Current Price (USD)',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    },
    {
      name: 'originalPrice',
      title: 'Original Price (USD)',
      type: 'number',
      description: 'The regular price before discount',
      validation: Rule => Rule.required().min(0),
    },
    {
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      description: 'Hex color code (e.g., #8b5a5a)',
      validation: Rule =>
        Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, {
          name: 'hex color',
          invert: false,
        }),
    },
    {
      name: 'featured',
      title: 'Featured Package',
      type: 'boolean',
      description: 'Mark as "Most Popular"',
      initialValue: false,
    },
    {
      name: 'services',
      title: 'Included Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
      description: 'Services included in this package',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this package appears',
      initialValue: 0,
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show/hide this package on the website',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      icon: 'icon',
    },
    prepare(selection) {
      const { title, price, icon } = selection;
      return {
        title: `${icon} ${title}`,
        subtitle: `$${price}`,
      };
    },
  },
};
