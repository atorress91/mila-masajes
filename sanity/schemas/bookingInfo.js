export default {
  name: 'bookingInfo',
  title: 'Booking Page Info',
  type: 'document',
  fields: [
    {
      name: 'importantInfo',
      title: 'Important Information',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Info Text',
              type: 'localeText',
            },
          ],
        },
      ],
    },
    {
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'localeString',
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'localeText',
            },
          ],
        },
      ],
    },
  ],
};
