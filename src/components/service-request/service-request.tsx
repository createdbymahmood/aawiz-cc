import {zodResolver} from '@hookform/resolvers/zod'
import {pick} from 'lodash-es'
import {Mail, Phone} from 'lucide-react'
import {FormProvider, useForm} from 'react-hook-form'
import {z} from 'zod'

import type {PhoneNumberInputProps} from '@/components/shared/phone-number-input'

import {FormCheckbox} from '@/components/form/form-checkbox'
import {FormPhoneNumberInput} from '@/components/form/form-phone-number-input'
import {FormTextArea} from '@/components/form/form-text-area'
import {FormTextInput} from '@/components/form/form-text-input'
import {Button} from '@/components/ui/button'
import {DialogTitle} from '@/components/ui/dialog'
import {EMAIL, PHONE_NUMBER} from '@/constants/info'
import {phoneNumberSchema} from '@/lib/utils'

const ContactInfoDesktop = () => {
  return (
    <div className='flex flex-col gap-10 mt-5 md:mt-32'>
      <div className='flex flex-col gap-2 md:gap-4 items-start'>
        <div className='flex size-11 items-center justify-center rounded-full bg-background shadow-md'>
          <Phone className='size-6' />
        </div>

        <p className='text-base font-semibold'>Call us</p>
        <p className='text-muted-foreground'>
          We're available Mon-Fri, 9am-5pm.
        </p>

        <span className='text-base font-semibold'>{PHONE_NUMBER}</span>
      </div>

      <div className='flex flex-col gap-2 md:gap-4 items-start'>
        <div className='flex size-11 items-center justify-center rounded-full bg-background shadow-md'>
          <Mail className='size-6' />
        </div>

        <p className='text-base font-semibold'>Email us</p>
        <p className='text-muted-foreground'>Our team is ready to assist.</p>
        <a className='text-base font-semibold' href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </div>
    </div>
  )
}

const formSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  phoneNumber: phoneNumberSchema,
  address: z.string().min(1, 'Address is required'),
  message: z.string().min(1, 'Message is required'),
  isAgreed: z.boolean().refine((value) => value, {
    message: 'You must agree to the terms and conditions',
  }),
})

type ServiceRequestFormValues = z.infer<typeof formSchema>

const defaultValues: ServiceRequestFormValues = {
  fullName: '',
  email: '',
  phoneNumber: '',
  address: '',
  message: '',
  isAgreed: false,
}

const ServiceRequestForm: React.FC = () => {
  const form = useForm<ServiceRequestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: ServiceRequestFormValues) => {
    const args = {
      ...pick(data, 'fullName', 'email', 'phoneNumber', 'address', 'message'),
    }

    console.log(args)
  }

  return (
    <div className='rounded-2xl md:rounded-3xl bg-background p-5 lg:p-10'>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-6'>
            <FormTextInput
              label='Full name / Company name *'
              name='fullName'
              inputProps={{placeholder: 'Enter your full name or company name'}}
            />

            <FormTextInput
              label='Email address *'
              name='email'
              inputProps={{placeholder: 'Enter your email'}}
            />

            <FormPhoneNumberInput
              label='Phone number *'
              name='phoneNumber'
              inputProps={
                {
                  placeholder: 'Enter your phone number',
                } as unknown as PhoneNumberInputProps
              }
            />

            <FormTextInput
              label='Address *'
              name='address'
              inputProps={{
                placeholder: 'e.g., 123 Main Street, New York',
              }}
            />

            <FormTextArea
              label='Your message *'
              name='message'
              inputProps={{
                placeholder: 'Explain more about your request...',
                rows: 10,
                className: 'min-h-[100px] max-h-[100px]',
              }}
            />

            <FormCheckbox
              label='I agree to the terms and conditions'
              name='isAgreed'
            />

            <Button className='w-full' type='submit'>
              Submit Your Request
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export const ServiceRequest: React.FC = () => {
  return (
    <div className='grid md:grid-cols-2 gap-10 size-full overflow-auto'>
      <div className='flex flex-col'>
        <DialogTitle className='text-3xl md:text-5xl font-semibold text-primary'>
          Service Request
        </DialogTitle>

        <span className='mt-8 md:mb-5'>
          Fill out the form below to request our construction services. Our team
          will review your request and get back to you within 1–2 business days.
        </span>
        <div className='hidden md:block'>
          <ContactInfoDesktop />
        </div>
      </div>

      <ServiceRequestForm />

      <div className='block md:hidden'>
        <ContactInfoDesktop />
      </div>
    </div>
  )
}
