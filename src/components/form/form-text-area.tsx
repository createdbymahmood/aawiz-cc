import type {ComponentProps} from 'react'

import {useFormContext} from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Textarea} from '@/components/ui/textarea'

interface FormTextAreaProps {
  name: string
  label: string
  inputProps?: ComponentProps<typeof Textarea>
}

export function FormTextArea({name, label, inputProps}: FormTextAreaProps) {
  const {control} = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({field}) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...inputProps} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
