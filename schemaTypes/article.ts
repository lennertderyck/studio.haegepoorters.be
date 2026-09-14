import {defineField, defineType} from 'sanity'
import {RenderIcon} from '../src/components/Icon/Icon.utils'
import {defineDatetimeField} from '../src/fields/datetime'

export const articleType = defineType({
  name: 'article',
  title: 'Nieuwsberichten',
  type: 'document',
  icon: RenderIcon('newspaper-line'),
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineDatetimeField({
      name: 'publishedAt',
      title: 'Publicatiedatum',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Hoofdafbeelding',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Inhoud',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
