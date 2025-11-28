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
      type: 'string',
      description: 'Title tag for search engines',
      validation: Rule => Rule.max(60),
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Meta description focused on the city',
      validation: Rule => Rule.max(160),
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Overview',
      type: 'text',
      rows: 4,
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
          type: 'string',
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
      type: 'string',
      initialValue: 'Reserva tu masaje',
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
            { name: 'quote', title: 'Quote', type: 'text', rows: 3 },
            { name: 'author', title: 'Author', type: 'string' },
            { name: 'context', title: 'Context (e.g. Quepos Resident)', type: 'string' },
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
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text', rows: 3 },
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
