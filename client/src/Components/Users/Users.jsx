import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import axios from "axios";
import { toast } from "react-hot-toast";





export default function Users({ setUserData }) {
    const [UpdateMood, setUpdateMood] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [loading, setloading] = useState(false)
    const [usersList, setusersList] = useState([])
    const [roleList, setroleList] = useState(['user', 'admin', 'manger'])
    let token = localStorage.getItem('userToken')
    let headers = {
        Authorization: `Bearer ${token}`
    }

    async function getAllUsers() {
        setloading(true)
        let token = localStorage.getItem('userToken')
        let headers = {
            Authorization: `Bearer ${token}`
        }
        await axios('https://dalilalhafr.com/api/auth/getUsers', { headers }).catch((err) => {
            if (err?.response?.status == 401) {
                localStorage.clear()
                setUserData(null)
                setloading(false)
                toast.error(err?.response?.data?.message)
            } else {
                setloading(false)
                toast.error(err?.response?.data?.message)
            }
        }).then((res) => {
            setusersList(res?.data?.data)
            setloading(false)
        })

    }
    useEffect(() => {
        getAllUsers()
    }, [])
    let validationSchema = Yup.object({
        name: Yup.string().required('name is required'),
        role: Yup.string().required('role is required'),
        isActive: Yup.boolean()

    })
    let formik = useFormik({
        initialValues: {
            user: {
                _id: "",
                name: "",
                email: "",
                role: "",
                isActive: true
            }
        }

        ,
        onSubmit: handleUpdate,
        validationSchema
    })
    const updateUser = (index) => {
        setUpdateMood(true)
        const selectedItem = usersList[index];
        formik.setValues({
            _id: selectedItem._id,
            name: selectedItem.name,
            email: selectedItem.email,
            role: selectedItem.role,
            isActive: selectedItem.isActive
        });
    };
    async function deleteUser(index) {
        await axios.delete(`https://dalilalhafr.com/api/auth/deleteUser/${index}`, { headers }).catch((err) => {
            if (err?.response?.status == 401) {
                localStorage.clear()
                setUserData(null)
                toast.error(err?.response?.data?.message)
            } else {
                toast.error(err?.response?.data?.message)
            }
        }).then((res) => {
            if (res?.data?.status == true) {
                toast.success(res?.data?.message)
                getAllUsers()
            } else if (res?.data?.status == false) {
                toast.success(res?.data?.message)
            } else {
                toast.error("something wrong please try again")
            }
        })

    }
    async function handleUpdate(values) {
        setLoading(true)
        await axios.patch(`https://dalilalhafr.com/api/auth/updateUser/${values._id}`, { name: values.name, role: values.role, isActive: values.isActive }, { headers }).catch((err) => {
            if (err?.response?.status == 401) {
                localStorage.clear()
                setUserData(null)
                setLoading(false)
                toast.error(err?.response?.data?.message)
            } else {
                setLoading(false)
                toast.error(err?.response?.data?.message)
            }
        }).then((res) => {
            if (res?.data?.status == true) {
                toast.success(res?.data?.message)
                getAllUsers()
                setLoading(false)
                setUpdateMood(false)
            } else if (res?.data?.status == false) {
                toast.error(res?.data?.message)
            } else {
                toast.error(res?.data?.message)
            }
            formik.setValues({
                _id: "",
                name: "",
                email: "",
                role: "",
                isActive: true
            });
        })


    }

    return <>
        {UpdateMood ?
            <div className='w-100 h-100  bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
                <div className='col-4 formRes'>
                    <form onSubmit={formik.handleSubmit} className='w-100 my-5  p-5 bg-light rounded-3 shadow '>

                        <label for="name" class="form-label">Name</label>
                        <input className='form-control' type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.name && formik.touched.name ? <div className='form-text text-danger'>{formik.errors.name}</div> : null}

                        <label for="email" class="form-label mt-2 ">Email</label>

                        <input className='form-control' type="email" name='email' id='email' value={formik.values.email} disabled />



                        <label for="role" class="form-label mt-2 ">role</label>

                        <select class="form-select" aria-label="Default select example" name='role' id='role' value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur}>

                            <option disabled selected>select role</option>
                            {roleList.map((role) => {
                                return <option value={role}>{role}</option>
                            })}

                        </select>

                        <label for="isActive" class="form-label mt-2 ">isActive</label>

                        <select class="form-select" aria-label="Default select example" name='isActive' id='isActive' value={formik.values.isActive} onChange={formik.handleChange} onBlur={formik.handleBlur}>

                            <option disabled selected>select status</option>
                            <option value={true}>Active</option>
                            <option value={false}>Not Active</option>


                        </select>




                        <div className='row my-2 g-3'>
                            {Loading ?
                                <button type='button' className='btn btn-outline-success col-12  '><i className='fa fa-spinner fa-spin'></i></button>
                                : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-outline-success col-12 '>save changes</button>
                            }
                            <button onClick={() => { setUpdateMood(false) }} type='reset' className='btn mx-auto btn-outline-danger col-12 '>cancel</button>

                        </div>

                    </form>
                </div>
            </div>
            : null}
        <div className=''>
            <h1 className='text-center'>Users</h1>
            {loading ? <div className='col-12 text-center my-5 py-5'>
                <i className='fa fa-spin fa-spinner fa-3x text-success'></i>
            </div> : <div className='col-11 tableCss mx-auto my-5'>

                {usersList.length ? <table class="table  table-striped table-hover text-center ">
                    <thead>
                        <tr className='text-capitalize'>
                            <th scope="col">#</th>
                            <th scope="col-2">name</th>
                            <th scope="col-2">email</th>
                            <th scope="col">role</th>
                            <th scope="col">status</th>
                            <th scope="col-5">Actions</th>


                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map((user, index) => {
                            return <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                {user.isActive == "true" || user.isActive == true ? <td><span class='badge text-bg-success' >Active</span></td> : <td><span class='badge text-bg-danger' >Not Active</span></td>}

                                <td>
                                    <div class="dropdown">
                                        <button class="btn btn-outline-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="fa-solid fa-list fa-lg"></i>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li onClick={() => deleteUser(user._id)} className="dropdown-item">delete</li>
                                            <li onClick={() => updateUser(index)} className="dropdown-item">update</li>
                                        </ul>
                                    </div>
                                </td>


                            </tr>
                        })}






                    </tbody>
                </table> : <h2 className='text-center my-5'>No Users</h2>}

            </div>}


        </div>
    </>
}
