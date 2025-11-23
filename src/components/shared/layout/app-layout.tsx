import {ServiceRequestDialog} from '@/components/service-request/service-request-dialog'
import {Container} from '@/components/ui/container'

import {Header} from './header'

interface AppLayoutProps {
  children: React.ReactNode
}
export const AppLayout: React.FC<AppLayoutProps> = ({children}) => {
  return (
    <div className='flex flex-col gap-5 py-5'>
      <ServiceRequestDialog />
      <Header />
      <Container>{children}</Container>
    </div>
  )
}
