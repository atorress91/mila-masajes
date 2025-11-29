export default {
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'string',
    },
    {
      name: 'es',
      title: 'Español',
      type: 'string',
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
        title: en || es || 'Sin traducción',
        subtitle,
      };
    },
  },
};
