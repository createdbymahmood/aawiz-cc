import type {ComponentProps} from 'react'

import {useFormContext} from 'react-hook-form'

import {CountryDropdown} from '@/components/shared/country-dropdown'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface FormCountryPickerProps {
  name: string
  label: string
  inputProps?: ComponentProps<typeof CountryDropdown>
}

export function FormCountryPicker({
  name,
  label,
  inputProps,
}: FormCountryPickerProps) {
  const {control} = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({field}) => (
        <FormItem className='w-full'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <CountryDropdown
              defaultValue={field.value}
              onChange={(value) => {
                field.onChange(value.alpha3)
              }}
              {...inputProps}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
