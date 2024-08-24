import React from 'react'
import { ModeToggle } from './mode-toogle'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex py-4 px-3 items-center justify-between'>
        <Link href={"/"}>
        <span className='text-2xl font-extrabold text-primary/80 hover'>HEEGA</span>
        </Link>
        <span className='self-end'>
        <ModeToggle />
        </span>
    </nav>
  )
}

export default Navbar
