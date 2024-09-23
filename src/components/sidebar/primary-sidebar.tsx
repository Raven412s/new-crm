
import Link from 'next/link'
import React from 'react'
import { Badge } from '../ui/badge'
import { menuItems } from '../providers/menu-items'
const Sidebar = () => {

  return (
    <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {menuItems.map((menuItem, index) => (
                menuItem.permission === "view" ? <Link
                key={index}
                  href={menuItem.href}

                  className="flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  {menuItem.icon}
                  {menuItem.label}
                  {menuItem.badge && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{menuItem.badge}</Badge>}
                </Link> : <></>




            ))}
          </nav>
        </div>
  )
}

export default Sidebar
