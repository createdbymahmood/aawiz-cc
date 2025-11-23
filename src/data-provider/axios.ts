import type {AxiosError, AxiosRequestConfig} from 'axios'

import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVICE_URL,
})

// add a second `options` argument here if you want to pass extra options to each generated query
export const axiosInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = axios.CancelToken.source()

  const promise = instance({
    ...config,
    ...options,

    cancelToken: source.token,
  }).then(({data}) => data)

  // @ts-ignore ignore cm
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>

export type BodyType<BodyData> = BodyData

export {instance}
