'use client'

import type {ComponentProps} from 'react'

import {ChevronDownIcon, PhoneIcon} from 'lucide-react'
import React, {useId} from 'react'
import * as RPNInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

import {useFormField} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {cn} from '@/lib/utils'

const PhoneInput = ({className, ...props}: React.ComponentProps<'input'>) => {
  return (
    <Input
      data-slot='phone-input'
      className={cn(
        '-ms-px rounded-s-none shadow-none focus-visible:z-10',
        className,
      )}
      {...props}
    />
  )
}

PhoneInput.displayName = 'PhoneInput'

const FlagComponent = ({country, countryName}: RPNInput.FlagProps) => {
  const Flag = flags[country]

  return (
    <span className='w-5 overflow-hidden rounded-sm'>
      {Flag ? (
        <Flag title={countryName} />
      ) : (
        <PhoneIcon size={16} aria-hidden='true' />
      )}
    </span>
  )
}
interface CountrySelectProps {
  disabled?: boolean
  value: RPNInput.Country
  onChange: (value: RPNInput.Country) => void
  options: {label: string; value: RPNInput.Country | undefined}[]
}

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as RPNInput.Country)
  }
  const {error} = useFormField()

  return (
    <div
      className={cn(
        'border-input bg-background text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 hover:bg-accent hover:text-foreground has-aria-invalid:border-destructive/60 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 relative inline-flex items-center self-stretch rounded-s-md border py-2 ps-3 pe-2 transition-[color,box-shadow] outline-none focus-within:z-10 focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50',
        {'border-destructive': !!error?.message},
      )}
    >
      <div aria-hidden='true' className='inline-flex items-center gap-1'>
        <FlagComponent aria-hidden='true' country={value} countryName={value} />
        <span className='text-muted-foreground/80'>
          <ChevronDownIcon size={16} aria-hidden='true' />
        </span>
      </div>
      <select
        aria-label='Select country'
        className='absolute inset-0 text-sm opacity-0'
        disabled={disabled}
        value={value}
        onChange={handleSelect}
      >
        <option key='default' value=''>
          Select a country
        </option>
        {options
          .filter((x) => x.value)
          .filter((x) => x.value === 'US')
          .map((option, i) => (
            <option key={option.value ?? `empty-${i}`} value={option.value}>
              {option.label}{' '}
              {option.value &&
                `+${RPNInput.getCountryCallingCode(option.value)}`}
            </option>
          ))}
      </select>
    </div>
  )
}

export interface PhoneNumberInputProps
  extends ComponentProps<typeof RPNInput.default> {}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  className,
  ...props
}) => {
  const id = useId()

  const handleChange = React.useCallback(
    (newValue: string | undefined) => onChange?.(newValue as RPNInput.Value),
    [onChange],
  )

  const renderInput = React.useCallback(
    (_props: any) => <PhoneInput {..._props} className={className} />,
    [className],
  )

  const renderCountrySelect = React.useCallback(
    (_props: any) => <CountrySelect {..._props} className={className} />,
    [className],
  )

  return (
    <RPNInput.default
      className={cn('flex rounded-md shadow-xs', className)}
      id={id}
      value={value}
      countrySelectComponent={renderCountrySelect}
      defaultCountry='US'
      flagComponent={FlagComponent}
      inputComponent={renderInput}
      international
      onChange={handleChange}
      {...props}
    />
  )
}
