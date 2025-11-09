export default {
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
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
      rows: 4,
      validation: Rule => Rule.required().max(300),
    },
    {
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(1000),
    },
    {
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      validation: Rule => Rule.required().min(15).max(240),
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    },
    {
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      description: 'Hex color code for the service card (e.g., #8b5a5a)',
      validation: Rule =>
        Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
          name: 'hex color',
          invert: false,
        }),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Service rating (0-5)',
      validation: Rule => Rule.min(0).max(5),
      initialValue: 5,
    },
    {
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      description: 'Display this service on the homepage',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this service appears',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      price: 'price',
    },
    prepare(selection) {
      const { title, media, price } = selection;
      return {
        title: title,
        subtitle: `$${price}`,
        media: media,
      };
    },
  },
};
