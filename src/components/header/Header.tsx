import React from 'react'
import MobileSidebar from '../sidebar/secondary-sidebar'
import SearchBar from './searchbar'
import { ModeToggle } from '../navbar/mode-toggle'
import Notifications from '../navbar/notifications'
import UserButton from './user-button'

const Header = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
    <MobileSidebar />
    <div className="w-full flex-1">
      <SearchBar />
    </div>
    <ModeToggle />
    <Notifications />
    <UserButton />
  </header>
  )
}

export default Header
