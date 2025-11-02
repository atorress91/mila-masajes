export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
      description: 'Rating from 1 to 5 stars',
    },
    {
      name: 'comment',
      title: 'Testimonial Comment',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().max(500),
    },
    {
      name: 'service',
      title: 'Service Reviewed',
      type: 'string',
      description: 'Name of the service this testimonial is about',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Client Photo (optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Display this testimonial prominently',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      rating: 'rating',
      media: 'image',
    },
    prepare(selection) {
      const { title, rating } = selection;
      const stars = '⭐'.repeat(rating);
      return {
        title: title,
        subtitle: stars,
      };
    },
  },
};
