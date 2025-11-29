export default {
  name: 'location',
  title: 'Service Location',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Location Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'localeString',
      description: 'Title tag for search engines',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'localeText',
      description: 'Meta description focused on the city',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'localeString',
    },
    {
      name: 'description',
      title: 'Overview',
      type: 'localeText',
    },
    {
      name: 'serviceAreas',
      title: 'Service Areas / Neighborhoods',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'keywords',
      title: 'Target Keywords',
      description: 'Terms like "masajes en Quepos"',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
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
      options: { hotspot: true },
    },
    {
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'localeString',
      initialValue: {
        en: 'Book your massage',
        es: 'Reserva tu masaje',
      },
    },
    {
      name: 'mapEmbed',
      title: 'Google Maps Embed (iframe or URL)',
      type: 'text',
      rows: 4,
    },
    {
      name: 'testimonials',
      title: 'Local Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote', title: 'Quote', type: 'localeText' },
            { name: 'author', title: 'Author', type: 'string' },
            { name: 'context', title: 'Context (e.g. Quepos Resident)', type: 'localeString' },
          ],
        },
      ],
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'localeString' },
            { name: 'answer', title: 'Answer', type: 'localeText' },
          ],
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'heroImage',
    },
  },
};
