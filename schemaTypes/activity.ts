import dayjs from "dayjs";
import { defineField, defineType } from "sanity";
import { RenderIcon } from "../src/components/Icon/Icon.utils";
import { defineDatetimeField } from "../src/fields/datetime";

export const activityType = defineType({
  name: 'activity',
  title: 'Activiteiten',
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
      name: 'type',
      title: 'Type activiteit',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'default',
      options: {
        layout: 'dropdown',
        list: [
          {title: 'Vergadering', value: 'default'},
          {title: 'Meerdaagse', value: 'multi'},
          {title: 'Weekend', value: 'weekend'},
          {title: 'Kamp', value: 'camp'},
          {title: 'Geen vergadering', value: 'none'},
        ],
      }
    }),
    defineDatetimeField({
      name: 'startDate',
      title: 'Startdatum',
      initialValue: () => dayjs().set('hour', 14).set('minute', 0).toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineDatetimeField({
      name: 'endDate',
      title: 'Einddatum',
      initialValue: () => dayjs().add(3, 'hour').toISOString(),
      validation: (rule) => rule.required(),
      hidden: ({document}) => document?.type === 'default', 
    }),
    defineField({
      name: 'group',
      title: 'Tak',
      type: 'reference',
      to: [{type: 'group'}],
      initialValue: () => ({
        _ref: 'c2d6e24d-3602-496b-ad48-26ec1982b0e3',
        _type: 'reference',
      }),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Beschrijving',
      type: 'text',
      rows: 5,
    }),
    defineDatetimeField({
      name: 'publishedAt',
      readOnly: process.env.NODE_ENV !== 'development',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
})
