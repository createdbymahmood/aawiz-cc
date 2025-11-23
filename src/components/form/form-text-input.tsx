'use client'

import type {ComponentProps} from 'react'

import {useFormContext} from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'

interface FormInputProps {
  name: string
  label: string
  inputProps?: ComponentProps<typeof Input>
}

export function FormTextInput({name, label, inputProps}: FormInputProps) {
  const {control} = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({field}) => (
        <FormItem className='w-full'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...inputProps} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
