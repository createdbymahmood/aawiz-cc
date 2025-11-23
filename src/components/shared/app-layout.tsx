import {ServiceRequestDialog} from '@/components/service-request/service-request-dialog'
import {Container} from '@/components/ui/container'

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({children}) => {
  return (
    <>
      <ServiceRequestDialog />
      <Container className='py-5'>{children}</Container>
    </>
  )
}
