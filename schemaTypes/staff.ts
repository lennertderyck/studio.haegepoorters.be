import { defineType } from "sanity";
import { RenderIcon } from "../src/components/Icon/Icon.utils";

export const staffType = defineType({
  name: 'staff',
  title: 'Leiding',
  type: 'document',
  icon: () => RenderIcon('user-2-line'),
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'lastName',
    },
  },
  fields: [
    {
      name: 'firstName',
      title: 'Voornaam',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'lastName',
      title: 'Achternaam',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'phoneNumber',
      title: 'Telefoon',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'roles',
      title: 'Functies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'role', options: {filter: 'order >= 0'}}]}],
      validation: (rule) => rule.required(),
    },
  ],
});