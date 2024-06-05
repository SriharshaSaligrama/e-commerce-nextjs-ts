import { Nav, NavLink } from '@/components/Nav';
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';

const AdminLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    noStore()

    return (<>
        <Nav>
            <NavLink href="/admin">Dashboard</NavLink>
            <NavLink href="/admin/products">Products</NavLink>
            <NavLink href="/admin/users">Customers</NavLink>
            <NavLink href="/admin/orders">Sales</NavLink>
            <NavLink href="/admin/discount-codes">Coupons</NavLink>
        </Nav>
        <div className='container my-6'>{children}</div>
    </>
    )
}

export default AdminLayout