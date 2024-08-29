import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Home, LineChart, Menu, Package, Package2, ShoppingCart, Users } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { menuItems } from '../providers/menu-items'

const MobileSidebar = () => {
  return (
    <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <span className="text-muted-foreground text-2xl font-semibold ">HEEGA</span>
              </Link>
              {menuItems.map((menuItem, index) => (
            <Link
            key={index}
              href={menuItem.href}
              className="flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              {menuItem.icon}
              {menuItem.label}
              {menuItem.badge && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{menuItem.badge}</Badge>}
            </Link>
            ))}
            </nav>
          </SheetContent>
        </Sheet>
  )
}

export default MobileSidebar
