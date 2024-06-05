import { Nav, NavLink } from '@/components/Nav';
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    noStore()

    return (<>
        <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/orders">My Orders</NavLink>
        </Nav>
        <div className='container my-6'>{children}</div>
    </>
    )
}

export default Layout