import { defineField, defineType } from "sanity";
import { RenderIcon } from "../src/Icon/Icon.utils";

export const activityType = defineType({
  name: 'activity',
  title: 'Activiteit',
  type: 'document',
  icon: () => RenderIcon('calendar-2-line'),
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'group',
      type: 'reference',
      to: [{type: 'group'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'period',
      type: 'reference',
      to: [{type: 'activityPeriod'}],
    })
  ],
})
