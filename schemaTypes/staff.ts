import {defineType} from 'sanity'
import {RenderIcon} from '../src/components/Icon/Icon.utils'

export const staffType = defineType({
  name: 'staff',
  title: 'Leiding',
  type: 'document',
  icon: RenderIcon('user-2-line'),
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'lastName',
    },
  },
  fieldsets: [
    {
      name: 'baseInfo',
      title: 'Introductie',
      options: {
        columns: 2,
        collapsible: false,
        collapsed: false, // Set to true to start collapsed
      },
    },
  ],
  fields: [
    {
      name: 'firstName',
      title: 'Voornaam',
      type: 'string',
      validation: (rule) => rule.required(),
      fieldset: 'baseInfo',
    },
    {
      name: 'lastName',
      title: 'Achternaam',
      type: 'string',
      validation: (rule) => rule.required(),
      fieldset: 'baseInfo',
    },
    {
      name: 'secondaryName',
      title: 'Bijnaam',
      description: 'Optioneel. Kan bijvoorbeeld een welpennaam zijn.',
      type: 'string',
      fieldset: 'baseInfo',
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
})
