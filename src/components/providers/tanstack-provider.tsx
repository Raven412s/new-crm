"use client"
import {useState} from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()
const TanstackProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default TanstackProvider
