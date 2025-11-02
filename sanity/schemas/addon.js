export default {
  name: 'addon',
  title: 'Add-ons',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Add-on Name',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Example: Aromatherapy, Hot Stones, CBD Oil Enhancement',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of what this add-on includes',
    },
    {
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(500),
      description: 'Additional price for this add-on',
    },
    {
      name: 'icon',
      title: 'Icon (optional)',
      type: 'string',
      description: 'Icon name or emoji to display (e.g., 🌸, 🔥, 🌿)',
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Only active add-ons will be shown to customers',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first',
    },
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      isActive: 'isActive',
      icon: 'icon',
    },
    prepare({ title, price, isActive, icon }) {
      return {
        title: `${icon || '•'} ${title}`,
        subtitle: `$${price.toFixed(2)} ${isActive ? '' : '(Inactive)'}`,
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
      title: 'Price (Low to High)',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
    {
      title: 'Price (High to Low)',
      name: 'priceDesc',
      by: [{ field: 'price', direction: 'desc' }],
    },
  ],
};
