import { Home, LineChart, Package, ShoppingCart, Users, Key } from 'lucide-react'

export const menuItems = [
    { label: 'Dashboard', icon: <Home className="h-4 w-4" />, href: '/dashboard', badge: null },
    { label: 'Users', icon: <Users className="h-4 w-4" />, href: '/users', badge: null },
    { label: 'Products', icon: <Package className="h-4 w-4" />, href: '/products', badge: null },
    { label: 'Orders', icon: <ShoppingCart className="h-4 w-4" />, href: '/orders', badge: 6 },
    { label: 'Analytics', icon: <LineChart className="h-4 w-4" />, href: '/analytics', badge: null },
    { label: 'Roles & Permissions', icon: <Key className="h-4 w-4" />, href: '/roles-permissions', badge: null },
]
