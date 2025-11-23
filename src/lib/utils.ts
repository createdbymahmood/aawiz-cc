import type {ClassValue} from 'clsx'

import {clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
import {z} from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const phoneNumberSchema = z
  .string('Invalid phone number')
  .min(1, 'Phone number is required')
  .refine((value) => {
    return /^(?:\+1)?[2-9]\d{9}$/.test(value)
  }, 'Invalid phone number')
