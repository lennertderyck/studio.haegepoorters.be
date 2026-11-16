// UnusedOptionInput.tsx
import { StringInputProps, useFormValue } from 'sanity';

export function UnusedOptionInput(props: StringInputProps) {
  // path: [...arrayPath, {_key}, fieldName]
  const arrayPath = props.path.slice(0, -2)
  const fieldName = props.path[props.path.length - 1] as string
  const items = (useFormValue(arrayPath) ?? []) as Record<string, any>[]

  const taken = items.map((item) => item?.[fieldName]).filter((v) => v && v !== props.value)

  const list = (props.schemaType.options?.list ?? []).filter((o: any) => {
    const value = typeof o === 'string' ? o : o.value
    return !taken.includes(value)
  })

  return props.renderDefault({
    ...props,
    schemaType: {
      ...props.schemaType,
      options: {...props.schemaType.options, list},
    },
  })
}
