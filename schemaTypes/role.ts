import {defineType} from 'sanity'
import {RenderIcon} from '../src/components/Icon/Icon.utils'

export const roleType = defineType({
  name: 'role',
  title: 'Functies',
  type: 'document',
  icon: RenderIcon('shield-star-line'),
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      description: 'De volgorde waarin de functies prioriteit krijgen op de website.',
    },
    {
      name: 'link',
      title: 'Linken aan',
      type: 'reference',
      to: [
        {type: 'group', name: 'group'},
        {type: 'role', name: 'role'},
      ],
      description:
        'Link deze functie aan een groep of een andere functie zodat dit op de website getoond kan worden.',
    },
  ],
  orderings: [
    {
      title: 'Volgorde',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
