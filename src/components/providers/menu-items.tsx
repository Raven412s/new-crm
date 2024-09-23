import { Home, LineChart, Package, ShoppingCart, Users, Key } from 'lucide-react'
import { FaTasks } from 'react-icons/fa'

export const menuItems = [
    { label: 'Home', icon: <Home className="h-4 w-4" />, href: '/', badge: null, permission: "view" },
    { label: 'Users', icon: <Users className="h-4 w-4" />, href: '/users', badge: null, permission: "view" },
    { label: 'Tasks', icon: <FaTasks className="h-4 w-4" />, href: '/tasks', badge: null, permission: "view" },
    { label: 'Products', icon: <Package className="h-4 w-4" />, href: '/products', badge: null, permission: "view" },
    { label: 'Orders', icon: <ShoppingCart className="h-4 w-4" />, href: '/orders', badge: 6, permission: "view" },
    { label: 'Analytics', icon: <LineChart className="h-4 w-4" />, href: '/analytics', badge: null, permission: "view" },
    { label: 'Roles & Permissions', icon: <Key className="h-4 w-4" />, href: '/roles-permissions', badge: null, permission: "view" },
]
