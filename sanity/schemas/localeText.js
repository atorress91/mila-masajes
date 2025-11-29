export default {
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
    },
    {
      name: 'es',
      title: 'Español',
      type: 'text',
      rows: 4,
    },
  ],
  preview: {
    select: {
      en: 'en',
      es: 'es',
    },
    prepare(selection) {
      const { en, es } = selection;
      let subtitle = '';

      if (en && es) {
        subtitle = 'EN · ES';
      } else if (en) {
        subtitle = 'EN';
      } else if (es) {
        subtitle = 'ES';
      }

      return {
        title: (en || es || 'Sin traducción').slice(0, 60),
        subtitle,
      };
    },
  },
};
