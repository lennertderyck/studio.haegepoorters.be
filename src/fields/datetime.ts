import { defineField, IntrinsicDefinitions, IntrinsicTypeName } from "sanity";

type FieldTypeOverwrite<T extends IntrinsicTypeName> = Omit<IntrinsicDefinitions[T], 'type'>

const datetimeOverwriteConstructor = <T extends IntrinsicTypeName>(name: T) => {
  // return (options: FieldTypeOverwrite<T>) => defineField({
    
  // })
}

export const defineDatetimeField = (options: FieldTypeOverwrite<'datetime'>) => defineField({
  ...options,
  type: 'datetime',
  options: {
    dateFormat: 'DD MMMM YYYY'
  },
})