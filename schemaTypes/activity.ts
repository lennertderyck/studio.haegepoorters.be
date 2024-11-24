import dayjs from "dayjs";
import { defineField, defineType } from "sanity";
import { AvailableIcons } from "../src/components/Icon/Icon.types";
import { RenderIcon } from "../src/components/Icon/Icon.utils";
import { defineDatetimeField } from "../src/fields/datetime";

const MULTI_DAY_TYPES = ['multi', 'weekend', 'camp']

export const activityType = defineType({
  name: 'activity',
  title: 'Activiteiten',
  type: 'document',
  icon: () => RenderIcon('calendar-2-line'),
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      endDate: 'endDate',
      group: 'group.name',
      type: 'type',
    },
    prepare(selection) {
      const {title, startDate, endDate, group, type} = selection;
      const start = dayjs(startDate).format('DD/MM/YYYY HH:mm');
      const end = dayjs(endDate).format('DD/MM/YYYY HH:mm');
      
      const renderedTitle = {
        default: title,
        multi: 'Meerdaagse',
        weekend: 'Weekend',
        camp: 'Kamp',
        none: 'Geen vergadering',
      }
      
      const subtitle = renderedTitle[type as keyof typeof renderedTitle];
      
      const icon: Record<string, AvailableIcons> = {
        default: 'calendar-2-line',
        multi: 'calendar-2-fill',
        weekend: 'hotel-bed-line',
        camp: 'tent-fill',
        none: 'close-large-line',
      }
      
      return {
        title: `${group} op ${dayjs(startDate).format('DD MMM YYYY')}`,
        subtitle,
        media: RenderIcon(icon[type as keyof typeof icon]),
      }
    }
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
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
      validation: (rule) => {
        return rule.custom((field, context) => {
          const isMulti = MULTI_DAY_TYPES.includes(String(context.document?.type))
          return isMulti ? 'Einddatum is verplicht voor meerdaagse activiteiten' : true;
        }).min(rule.valueOfField('startDate'))
      },
      // hidden: ({document}) => {
      //   return !MULTI_DAY_TYPES.includes(String(document?.type))
      // }, 
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
    }),
  ],
})
