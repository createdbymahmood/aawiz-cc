import {toClientErrorMessage} from '@/lib/to-client-error-message'

interface DefaultErrorComponentProps {
  error: Error
}
export const DefaultErrorComponent: React.FC<DefaultErrorComponentProps> = ({
  error,
}) => {
  return <div>{toClientErrorMessage(error)}</div>
}
