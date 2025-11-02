import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Massage Bliss CMS',

  projectId: '6z0ec6tg',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  // Configuración personalizada del escritorio
  desk: {
    structure: S =>
      S.list()
        .title('Content')
        .items([
          S.listItem().title('Page Content').child(S.documentTypeList('pageContent').title('Pages')),
          S.divider(),
          S.listItem().title('Services').child(S.documentTypeList('service').title('All Services')),
          S.listItem().title('Benefits').child(S.documentTypeList('benefit').title('All Benefits')),
          S.divider(),
          S.listItem().title('Testimonials').child(S.documentTypeList('testimonial').title('All Testimonials')),
        ]),
  },
});
