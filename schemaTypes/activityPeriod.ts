import dayjs from "dayjs";
import { defineType } from "sanity";
import { RenderIcon } from "../src/Icon/Icon.utils";

export const activityPeriodType = defineType({
  name: 'activityPeriod',
  title: 'Periode',
  type: 'document',
  icon: () => RenderIcon('calendar-schedule-line'),
  fields: [
    {
      name: 'editable',
      title: 'Bewerkbaar',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'published',
      title: 'Gepubliceerd',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'startDate',
      title: 'Startdatum',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    },
    {
      name: 'endDate',
      title: 'Einddatum',
      type: 'datetime',
      initialValue: () => dayjs().add(3, 'months').toISOString(),
      validation: (rule) => rule.required(),
    },
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