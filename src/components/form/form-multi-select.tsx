import type {ComponentProps} from 'react'

import {useFormContext} from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {MultiSelect} from '@/components/ui/multiselect'

interface FormMultiSelectProps {
  name: string
  label: string
  inputProps?: ComponentProps<typeof MultiSelect>
}

export function FormMultiSelect({
  name,
  label,
  inputProps,
}: FormMultiSelectProps) {
  const {control} = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({field}) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <MultiSelect {...inputProps} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
