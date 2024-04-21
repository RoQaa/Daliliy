import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/logo.jpeg'

export default function NavbarTop({ userData, setUserData }) {
    let navigate = useNavigate()

    function logOut() {
        localStorage.clear()
        setUserData(null)
    }


    return <>
        <nav className="navbar navbar-expand-xl navbar-light bg-light border border-1  ">
            <div className="container-fluid px-5">
                <a className="navbar-brand ">
                    <img src={logo} className='img-fluid col-3  border border-1 rounded-2  shadow-lg ' alt="" srcset="" />
                </a>
                <button className="navbar-toggler d-xl-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">


                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">


                        {userData != null ? <li className="nav-item">
                            <Link onClick={logOut} className="nav-link text-center " to={'/'}>Logout</Link>
                            <Link className='text-decoration-none linksRes text-black-50 pt-2' to={'/'}><p>Users</p></Link>
                            <Link className='text-decoration-none linksRes text-black-50' to={'categories'}><p>Categories</p></Link>
                            <Link className='text-decoration-none linksRes text-black-50' to={'items'}><p>Items</p></Link>
                            <Link className='text-decoration-none linksRes text-black-50' to={'createUser'}><p>createUser</p></Link>
                            <Link className='text-decoration-none linksRes text-black-50' to={'profile'}><p>profile</p></Link>

                        </li> : null}








                    </ul>




                </div>
            </div>
        </nav>

    </>
}
