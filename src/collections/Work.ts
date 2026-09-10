import type { CollectionConfig } from 'payload'

export const Work: CollectionConfig = {
  slug: 'work',

  access: {
    read: () => true,
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'postedAt', 'destination'],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'postedAt',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },

    {
      name: 'destination',
      type: 'select',
      required: true,
      defaultValue: 'page',
      options: [
        {
          label: 'SIXTHOU page',
          value: 'page',
        },
        {
          label: 'External link',
          value: 'link',
        },
      ],
    },

    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Music',
          value: 'music',
        },
        {
          label: 'Film',
          value: 'film',
        },
        {
          label: 'Photography',
          value: 'photography',
        },
        {
          label: 'Writing',
          value: 'writing',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
    },

    {
      name: 'statement',
      type: 'textarea',
      admin: {
        description: 'Optional text shown on the SIXTHOU post page.',
      },
    },

    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main image for a SIXTHOU page.',
      },
    },

    {
      name: 'gallery',
      type: 'array',
      admin: {
        description: 'Additional images for a SIXTHOU page.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    {
      name: 'externalUrl',
      type: 'text',
      admin: {
        description:
          'For External link posts. Example: a YouTube or Vimeo URL.',
      },
    },
  ],
}