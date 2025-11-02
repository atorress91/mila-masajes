export default {
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    {
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Homepage', value: 'homepage' },
          { title: 'Services Page', value: 'services' },
          { title: 'Gallery Page', value: 'gallery' },
          { title: 'Contact Page', value: 'contact' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'title',
      title: 'Page Title (SEO)',
      type: 'string',
      validation: Rule => Rule.required().max(60),
    },
    {
      name: 'description',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(160),
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'SEO keywords for this page',
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
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
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630px recommended)',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'pageType',
      subtitle: 'heroTitle',
      media: 'heroImage',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        subtitle: subtitle,
      };
    },
  },
};
