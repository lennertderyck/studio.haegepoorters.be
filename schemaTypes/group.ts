import { defineField, defineType } from "sanity";
import { RenderIcon } from "../src/Icon/Icon.utils";

export const groupType = defineType({
  name: 'group',
  title: 'Groep',
  type: 'document',
  icon: () => RenderIcon('home-smile-2-line'),
  fields: [
    defineField({
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'abbr',
      title: 'Afkorting',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Volgorde',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ]
});