'use client'

import {countries} from 'country-data-list'
import {CheckIcon, ChevronDown, Globe} from 'lucide-react'
import React, {forwardRef, useCallback, useEffect, useState} from 'react'
import {CircleFlag} from 'react-circle-flags'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {cn} from '@/lib/utils'

// Country interface
export interface Country {
  alpha2: string
  alpha3: string
  countryCallingCodes: string[]
  currencies: string[]
  emoji?: string
  ioc: string
  languages: string[]
  name: string
  status: string
}

// Dropdown props
interface CountryDropdownProps {
  options?: Country[]
  onChange?: (country: Country) => void
  defaultValue?: string
  disabled?: boolean
  placeholder?: string
  slim?: boolean
  className?: string
}

const DEFAULT_OPTIONS = countries.all.filter(
  (country: Country) =>
    country.emoji && country.status !== 'deleted' && country.ioc !== 'PRK',
)

const CountryDropdownComponent = (
  {
    options = DEFAULT_OPTIONS,
    onChange,
    defaultValue,
    disabled = false,
    placeholder = 'Select a country',
    slim = false,
    className,
    ...props
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    undefined,
  )

  useEffect(() => {
    if (defaultValue) {
      const initialCountry = options.find(
        (country) => country.alpha3 === defaultValue,
      )
      setSelectedCountry(initialCountry)
    } else {
      setSelectedCountry(undefined)
    }
  }, [defaultValue, options])

  const handleSelect = useCallback(
    (country: Country) => {
      setSelectedCountry(country)
      onChange?.(country)
      setOpen(false)
    },
    [onChange],
  )

  const triggerClasses = cn(
    'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
    className,
    slim && 'w-20',
  )

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        className={triggerClasses}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {selectedCountry ? (
          <div className='flex w-0 grow items-center gap-2 overflow-hidden'>
            <div className='inline-flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full'>
              <CircleFlag
                height={20}
                countryCode={selectedCountry.alpha2.toLowerCase()}
              />
            </div>
            {!slim && <span className='truncate'>{selectedCountry.name}</span>}
          </div>
        ) : (
          <span className='text-muted-foreground'>
            {!slim ? placeholder : <Globe size={20} />}
          </span>
        )}
        <ChevronDown size={16} />
      </PopoverTrigger>

      <PopoverContent
        className='border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0 overscroll-contain pointer-events-auto'
        side='bottom'
        sideOffset={4}
        avoidCollisions={false}
        collisionPadding={10}
      >
        <Command className='w-full'>
          <div className='sticky top-0 z-10 bg-popover'>
            <CommandInput placeholder='Search country...' />
          </div>
          <CommandList className='max-h-[250px] overflow-y-auto'>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x.name)
                .map((option, key: number) => (
                  <CommandItem
                    className='flex w-full items-center gap-2'
                    key={key}
                    onSelect={() => handleSelect(option)}
                  >
                    <div className='flex w-0 grow space-x-2 overflow-hidden'>
                      <div className='inline-flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full'>
                        <CircleFlag
                          height={20}
                          countryCode={option.alpha2.toLowerCase()}
                        />
                      </div>
                      <span className='truncate'>{option.name}</span>
                    </div>
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4 shrink-0',
                        option.name === selectedCountry?.name
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

CountryDropdownComponent.displayName = 'CountryDropdownComponent'
export const CountryDropdown = forwardRef(CountryDropdownComponent)
