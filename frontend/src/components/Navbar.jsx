import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiShoppingCart2Line } from "react-icons/ri"
import { BsPerson } from "react-icons/bs"
import { BiHeart } from "react-icons/bi"
import { GiHamburgerMenu } from "react-icons/gi"
import { RxCross2 } from "react-icons/rx";
import { Drawer } from "antd";
import { useCart } from 'react-use-cart'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import logo from "../assets/HDS Logo.png"
import CartItem from './CartItem'

import "./navbar.css"

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const [open, setOpen] = useState(false);

    const [animationParent] = useAutoAnimate()

    const {
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
    } = useCart();

    const showDrawer = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <div className="navLeft">
                    {/* <h1>HDS</h1> */}
                    <Link to={"/"} className='test'>
                        <img className='logo' src={logo} alt="" />
                    </Link>
                </div>
                <div className='navRight'>
                    {/* <button className='menu-icons'><BiHeart /></button> */}
                    <button className='menu-icons' onClick={showDrawer}><RiShoppingCart2Line /></button>
                    <button className='menu-icons'><BsPerson /></button>
                    <button className='hamburger' onClick={() => {
                        if (menu === true) {
                            setMenu(false)
                        } else {
                            setMenu(true);
                        }
                    }}> {menu ? <RxCross2 /> : < GiHamburgerMenu />} </button>
                    <Drawer title="Cart" placement='right' onClose={onClose} open={open}>
                        {isEmpty ? (
                            <div>
                                <h1>No items</h1>
                            </div>
                        ) : (
                            <div className='cart-menu' ref={animationParent}>
                                <h1>{totalUniqueItems} items</h1>

                                <div className="cart-products" >
                                    {items.map((item, index) => (
                                        <CartItem key={index} data={item} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </Drawer>
                </div>
            </div>
            {menu &&
                <div className='ham-menu'>
                    <ul>
                        {/* <li>Favorites</li> */}
                        <li onClick={showDrawer}>Cart</li>
                        <li>Account</li>
                    </ul>
                </div>
            }
        </nav>
    )
}

export default Navbar