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
      type: 'localeString',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Meta Description (SEO)',
      type: 'localeText',
      validation: Rule => Rule.required(),
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
      type: 'localeString',
      validation: Rule => Rule.required(),
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'localeText',
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image (Left)',
      type: 'image',
      description: 'Main background image with text overlay (1400x900px recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'localeString',
        },
      ],
    },
    {
      name: 'heroImageTopRight',
      title: 'Hero Image Top Right',
      type: 'image',
      description: 'Small image on top right (800x800px recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'localeString',
        },
      ],
    },
    {
      name: 'heroImageBottomRight',
      title: 'Hero Image Bottom Right',
      type: 'image',
      description: 'Small image on bottom right (800x800px recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'localeString',
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
      const { title, subtitle, media } = selection;
      const formattedTitle = title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Page';
      return {
        title: formattedTitle,
        subtitle: subtitle?.en || subtitle?.es,
        media,
      };
    },
  },
};
