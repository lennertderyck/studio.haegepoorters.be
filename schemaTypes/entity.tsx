import { Select } from '@sanity/ui';
import { ArrayOfPrimitivesInputProps, BooleanInputProps, defineField, defineType, set } from 'sanity';
import { MAIN_CONTENT_TYPES } from '.';
import { RenderIcon } from '../src/components/Icon/Icon.utils';
import { UnusedOptionInput } from '../src/components/Test/Test';
import { defineDatetimeField } from '../src/fields/datetime';

const ALL = MAIN_CONTENT_TYPES.map((t) => ({title: t.title, value: t.name}))

const BooleanSelectInput = (props: BooleanInputProps) => {
  const {value, onChange} = props

  return (
    <Select
      value={value ? 'true' : 'false'}
      onChange={(e) => onChange(set(e.currentTarget.value === 'true'))}
    >
      <option value="true">Enabled</option>
      <option value="false">Disabled</option>
    </Select>
  )
}

export function UnselectedOnlyInput(props: ArrayOfPrimitivesInputProps) {
  const selected = (props.value ?? []) as string[]
  const list = (props.schemaType.options?.list ?? []).filter(
    (o: any) => !selected.includes(typeof o === 'string' ? o : o.value),
  )

  return props.renderDefault({
    ...props,
    schemaType: {
      ...props.schemaType,
      options: {...props.schemaType.options, list},
    },
  })
}

export const entityType = defineType({
  name: 'entity',
  title: 'Entiteiten',
  type: 'document',
  icon: RenderIcon('instance-line'),
  description:
    'Een entiteit binnen het systeem. Hiernaar wordt verwezen vanuit andere onderdelen van de applicatie.',
  preview: {
    select: {
      title: 'name',
      subtitle: 'body',
    },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Beschrijving',
      type: 'text',
      rows: 1,
    }),
    defineField({
      title: 'Linkable schemaTypes',
      name: 'referenceableTypes',
      type: 'array',
      options: {
        sortable: false,
      },
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'kind',
              title: 'Content Type',
              type: 'string',
              options: {
                list: MAIN_CONTENT_TYPES.map((schemaType) => ({
                  title: schemaType.title || schemaType.name,
                  value: schemaType.name,
                })),
              },
              components: {input: UnusedOptionInput},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'enabled',
              title: 'Enable this type',
              type: 'boolean',
              initialValue: false,
              components: {
                input: BooleanSelectInput,
              },
            }),
          ],
          preview: {
            select: {
              type: 'kind',
              enabled: 'enabled',
            },
            prepare({type, enabled}) {
              return {
                title: MAIN_CONTENT_TYPES.find((t) => t.name === type)?.title || type,
                subtitle: enabled ? 'Enabled' : 'Disabled',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
      description:
        'Met deze content types mag deze entiteit gelinkt worden in andere onderdelen van de applicatie',
    }),

    defineDatetimeField({
      name: 'publishedAt',
      readOnly: process.env.NODE_ENV !== 'development',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
