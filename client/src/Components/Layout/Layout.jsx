import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar..jsx'
import Users from '../Users/Users.jsx'
import styles from './Layout.css'
import { Outlet } from 'react-router-dom'
import NavbarTop from '../NavbarTop/NavbarTop.jsx'

export default function Layout({ userInfo, userData, setUserData,getUserInfo }) {


    return <>
        {userData != null ? <>
            <div className='fixed-top z-1 '>

                <NavbarTop userData={userData} setUserData={setUserData} />

            </div>

            <div className='row g-0 mt-5 pt-5'>

                <div className=' col-3 vh-100 fixed-top z-0 pt-5 navbarRight'>
                    <Navbar getUserInfo={getUserInfo} userInfo={userInfo} />
                </div>
                <div className='col-md-9   align-self-center ms-auto pt-3 '>
                    <Outlet></Outlet>
                </div>
            </div>
        </> :
            <div className='w-100 h-100   row mx-0  justify-content-center align-content-center'>
                <div className='col-9'>
                    <Outlet></Outlet>
                </div>
            </div>
        }







    </>

}
