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

interface CheckboxOption {
  value: string
  label: string
}

interface CheckboxGroup {
  title: string
  options: CheckboxOption[]
}

interface FormCheckboxProps {
  name: string
  label: string
  groups: CheckboxGroup[]
}

export function FormCheckboxGroup({name, label, groups}: FormCheckboxProps) {
  const {control} = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({field}) => (
        <FormItem>
          <FormLabel className='text-base font-semibold'>{label}</FormLabel>
          <div className='space-y-6'>
            {groups.map((group, groupIndex) => (
              <div className='space-y-3' key={groupIndex}>
                <h4 className='text-sm font-medium text-muted-foreground'>
                  {group.title}
                </h4>
                <div className='flex flex-col gap-3'>
                  {group.options.map((option, optionIndex) => (
                    <FormControl key={optionIndex}>
                      <div className='flex items-center space-x-2 py-2'>
                        <Checkbox
                          checked={field.value?.includes(option.value) || false}
                          className='size-5 border-foreground'
                          onCheckedChange={(checked) => {
                            const currentValues = field.value || []
                            if (checked) {
                              field.onChange([...currentValues, option.value])
                            } else {
                              field.onChange(
                                currentValues.filter(
                                  (value: string) => value !== option.value,
                                ),
                              )
                            }
                          }}
                        />
                        <label className='text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-medium'>
                          {option.label}
                        </label>
                      </div>
                    </FormControl>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
