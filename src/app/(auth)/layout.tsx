import React, { ReactNode } from 'react'

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='h-screen w-screen absolute left-0 '>{children}</div>
  )
}

export default Layout
