export default {
  name: 'heroImage',
  title: 'Hero Images',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Internal name for this image',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        },
      ],
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          { title: 'Background (Main - Left)', value: 'top' },
          { title: 'Top Right', value: 'bottom-left' },
          { title: 'Bottom Right', value: 'bottom-right' },
        ],
      },
      validation: Rule => Rule.required(),
      description: 'Background = Main left background image. Top/Bottom Right = Small images on the right side',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first',
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Only active images will be shown',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      position: 'position',
      isActive: 'isActive',
    },
    prepare({ title, media, position, isActive }) {
      return {
        title: title,
        subtitle: `${position} ${isActive ? '' : '(Inactive)'}`,
        media: media,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Position',
      name: 'positionAsc',
      by: [{ field: 'position', direction: 'asc' }],
    },
  ],
};
