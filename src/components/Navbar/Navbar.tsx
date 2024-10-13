import { Bell, ShoppingCart } from 'lucide-react';
import React from 'react';
import './Navbar.css';
import { IonSearchbar } from '@ionic/react';
const Navbar = () => {
    return (
        <div className='flex'>
            <Bell className='bell' />
            <ShoppingCart />
            <IonSearchbar className='search' />
        </div>
    );
};

export default Navbar;