import {zodResolver} from '@hookform/resolvers/zod'
import {pick} from 'lodash-es'
import {FormProvider, useForm} from 'react-hook-form'
import {toast} from 'sonner'
import {z} from 'zod'

import type {PhoneNumberInputProps} from '@/components/shared/phone-number-input'

import {FormCheckbox} from '@/components/form/form-checkbox'
import {FormPhoneNumberInput} from '@/components/form/form-phone-number-input'
import {FormTextArea} from '@/components/form/form-text-area'
import {FormTextInput} from '@/components/form/form-text-input'
import {useServiceRequestDialogState} from '@/components/service-request/service-request-dialog'
import {Button} from '@/components/ui/button'
import {phoneNumberSchema} from '@/lib/utils'

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

  const {close} = useServiceRequestDialogState()

  const onSubmit = async (data: ServiceRequestFormValues) => {
    const args = {
      ...pick(data, 'fullName', 'email', 'phoneNumber', 'address', 'message'),
    }
    toast.success('Request submitted successfully')
    close()
  }

  return (
    <div className='rounded-2xl md:rounded-3xl bg-background'>
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
  return <ServiceRequestForm />
}
