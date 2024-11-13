import dayjs from "dayjs";
import { defineField, defineType } from "sanity";
import { RenderIcon } from "../src/components/Icon/Icon.utils";
import { defineDatetimeField } from "../src/fields/datetime";

export const activityPeriodType = defineType({
  name: 'activityPeriod',
  title: 'Periodes',
  type: 'document',
  icon: () => RenderIcon('calendar-schedule-line'),
  fields: [
    defineField({
      name: 'editable',
      title: 'Bewerkbaar',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'published',
      title: 'Gepubliceerd',
      type: 'boolean',
      initialValue: false,
    }),
    defineDatetimeField({
      name: 'startDate',
      title: 'Startdatum',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineDatetimeField({
      name: 'endDate',
      title: 'Einddatum',
      initialValue: () => dayjs().add(3, 'months').toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare(selection) {
      const { startDate, endDate } = selection;
      const yearsDiffer = dayjs(startDate).year() !== dayjs(endDate).year();
      const dateFormat = yearsDiffer ? 'DD MMMM YYYY' : 'DD MMMM';
      
      return {
        title: `${dayjs(startDate).format(dateFormat)} tot ${dayjs(endDate).format(dateFormat)}`,
        // title: `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`,
      }
    }
  }
})