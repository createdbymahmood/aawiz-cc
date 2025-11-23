'use client'

import {useFormContext} from 'react-hook-form'

import {Checkbox} from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface FormCheckboxProps {
  name: string
  label: string
}

export function FormCheckbox({name, label}: FormCheckboxProps) {
  const {control} = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({field}) => (
        <FormItem className='flex flex-col'>
          <div className='flex flex-row items-center'>
            <FormControl>
              <div className='flex items-center space-x-2 py-2'>
                <Checkbox
                  checked={field.value}
                  className='size-5 border-foreground'
                  id={name}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)
                  }}
                />
              </div>
            </FormControl>
            <FormLabel htmlFor={name}>{label}</FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
