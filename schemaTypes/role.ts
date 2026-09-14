import {defineType} from 'sanity'
import {RenderIcon} from '../src/components/Icon/Icon.utils'

const groepsadministratieReferenceTypes = [
  {
    title: 'Rol in de Groepsadministratie',
    value: 'role',
    description:
      'Een standaard functie toegewezen via de Groepsadministratie. Dit is niet de naam van de functie.',
  },
  {
    title: 'Groepseigen functie (ID)',
    value: 'customRole',
    description:
      'Een functie die werd aangemaakt door de groep zelf. Vul het ID in van deze rol. Dit is niet de naam van de groepseigen functie.',
  },
]

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
    {
      name: 'groepsadministratieReference',
      title: 'Groepsadministratie referentie',
      description:
        'Dit helpt bij het automatisch toewijzen van een rol aan leiding via de Groepsadministratie. Je kunt meerdere waarden toevoegen.',
      type: 'array',

      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: groepsadministratieReferenceTypes.map((item) => ({
                  title: item.title,
                  value: item.value,
                })),
              },
              validation: (rule) => rule.required(),
              initialValue: 'role',
              description: 'Kies hoe deze rol wordt toegewezen via de Groepsadministratie.',
            },
            {
              name: 'value',
              title: 'Referentie naar Groepsadministratie',
              description:
                'Dit is de code van de rol in de Groepsadministratie. Bijvoorbeeld "WPL" voor "Welpenleiding". Voor groepseigen functies is dit het ID van de rol.',
              type: 'string',
            },
          ],
          preview: {
            select: {
              type: 'type',
              value: 'value',
            },
            prepare({type, value}) {
              const title =
                groepsadministratieReferenceTypes.find((item) => item.value === type)?.title || ''

              return {
                title,
                subtitle: `Rol code of ID: "${value}"`,
              }
            },
          },
        },
      ],
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
