import {useFormContext} from 'react-hook-form'

import type {PhoneNumberInputProps} from '@/components/shared/phone-number-input'

import {PhoneNumberInput} from '@/components/shared/phone-number-input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface FormPhoneNumberInputProps {
  name: string
  label: string
  inputProps?: PhoneNumberInputProps
}

export function FormPhoneNumberInput({
  name,
  label,
  inputProps,
}: FormPhoneNumberInputProps) {
  const {control} = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({field}) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <PhoneNumberInput {...inputProps} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
