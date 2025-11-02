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
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of benefits for this service',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Relaxation', value: 'relaxation' },
          { title: 'Therapeutic', value: 'therapeutic' },
          { title: 'Sports', value: 'sports' },
          { title: 'Hot Stone', value: 'hotstone' },
          { title: 'Specialty', value: 'specialty' },
        ],
      },
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
