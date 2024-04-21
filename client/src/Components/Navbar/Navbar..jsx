import React, { useEffect } from 'react'
import styles from './Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar({userInfo,getUserInfo}) {
    useEffect(() => {
        getUserInfo()
    }, [])
    
    return <>
        <div className='bg-light border p-3 border-1 navbar-light  h-100 '>
            <div className='col-10 mx-auto mt-5 row navbarMedium '>
                <div className='row align-items-baseline logoName'>
                    <div className='col-4 '>
                        <img className='logoo img-fluid rounded-circle shadow' src={userInfo?.profileImage} alt="" srcset="" />
                    </div>
                    <div className='col-8 '>
                        <h4 className='text-capitalize  fw-bolder pb-0'>{userInfo?.name}</h4>
                        <p className='fw-bolder'>{userInfo?.role}</p>
                    </div>
                </div>
                <div className=' mt-5'>
                    <h3>Dashboard</h3>
                    <div className='px-4 text-black-50 fw-bold fs-4 pt-2'>
                    <Link className='text-decoration-none   text-black-50' to={'/'}><p>Users</p></Link>
                    <Link className='text-decoration-none   text-black-50' to={'categories'}><p>Categories</p></Link>
                    <Link className='text-decoration-none   text-black-50' to={'items'}><p> Items</p></Link>
                    <Link className='text-decoration-none   text-black-50' to={'createUser'}><p>createUser</p></Link>
                    <Link className='text-decoration-none   text-black-50' to={'profile'}><p>profile</p></Link>


                    
                    </div>

                </div>
            </div>

        </div>
    </>
}
