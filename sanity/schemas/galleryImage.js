export default {
  name: 'galleryImage',
  title: 'Gallery Images',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Image Title',
      type: 'localeString',
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'localeString',
          validation: Rule => Rule.required(),
        },
      ],
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Massage Therapy', value: 'massage' },
          { title: 'Spa Facilities', value: 'spa' },
          { title: 'Treatment Rooms', value: 'rooms' },
          { title: 'Relaxation Areas', value: 'relaxation' },
          { title: 'Staff', value: 'staff' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeText',
    },
    {
      name: 'featured',
      title: 'Featured Image',
      type: 'boolean',
      description: 'Display this image prominently',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this image appears',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category',
    },
    prepare(selection) {
      const { title, media, category } = selection;
      return {
        title: title?.en || title?.es || 'Gallery image',
        subtitle: category,
        media,
      };
    },
  },
};
