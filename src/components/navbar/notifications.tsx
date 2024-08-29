import React from 'react'
import { Button } from '../ui/button'
import { Bell } from 'lucide-react'

const Notifications = () => {
  return (
    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
    <Bell className="h-4 w-4" />
    <span className="sr-only">Toggle notifications</span>
    </Button>
  )
}

export default Notifications
