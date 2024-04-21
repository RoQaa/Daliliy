import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { getProfleData } from '../../redux/slices/ProfileSlice.js';




export default function Profile() {

    let { ProfileList } = useSelector((state) => state.ProfileReduser)
    const [UpdatePasssMood, setUpdatePassMood] = useState(false)
    const [UpdateMood, setUpdateMood] = useState(false)
    const [Loading, setLoading] = useState(false)


    let dispatch = useDispatch()
    let token = localStorage.getItem('userToken')
    let headers = {
        Authorization: `Bearer ${token}`
    }


    useEffect(() => {
        dispatch(getProfleData())
    }, [])




    async function handleUpdatePass(values) {
        setLoading(true)
        let { data } = await axios.patch(`https://dalilalhafr.com/api/auth/updatePassword`, {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            newPasswordConfirm: values.newPasswordConfirm
        }, { headers })
        formik.resetForm()
        toast.success(data.message)
        setLoading(false)
        setUpdatePassMood(false)
    }

    let validationSchema = Yup.object({
        currentPassword: Yup.string().required('currentPassword is required'),
        newPassword: Yup.string().required('newPassword is required'),
        newPasswordConfirm: Yup.string().required('newPasswordConfirm is required').equals([Yup.ref('newPassword')], 'you must be like a new password'),
    })
    let formik = useFormik({
        initialValues: {
            password: {
                currentPassword: "",
                newPassword: "",
                newPasswordConfirm: ""
            }
        }
        ,
        onSubmit: handleUpdatePass,
        validationSchema
    })




    async function handleUpdateData(values) {
        setLoading(true)

        let formData = new FormData()
        formData.append('profileImage', values.profileImage)
        formData.append('name', values.name)

        let { data } = await axios.patch(`https://dalilalhafr.com/api/auth/updateUser`, formData, { headers })
        formik2.resetForm()
        toast.success(data.message)
        dispatch(getProfleData())
        setLoading(false)
        setUpdateMood(false)

    }

    let validationDataSchema = Yup.object({
        name: Yup.string().required('name is required'),
        profileImage: Yup.mixed().required('profile Image is required'),

    })
    let formik2 = useFormik({
        initialValues: {
            data: {
                name: "",
                profileImage: "",
            }
        }
        ,
        onSubmit: handleUpdateData,
        validationDataSchema
    })





    return <>
        {UpdateMood ? <div className='w-100 h-100  bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
            <div className="col-4 formRes">
                <form onSubmit={formik2.handleSubmit} className='w-100 bg-light  p-5 rounded-3 shadow '>

                    <label for="name" class="form-label">name</label>
                    <input className='form-control' type="text" name='name' id='name' value={formik2.values.name} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
                    {formik2.errors.name && formik2.touched.name ? <div className='form-text text-danger'>{formik2.errors.name}</div> : null}

                    <label for="profileImage" class="form-label">profileImage</label>
                    <input
                        onChange={(event) => formik2.setFieldValue('profileImage', event.currentTarget.files[0])}
                        className='form-control'
                        type="file"
                        name='profileImage'
                        id='profileImage'
                        onBlur={formik2.handleBlur} />
                    {formik2.errors.profileImage && formik2.touched.profileImage ? <div className='form-text text-danger'>{formik2.errors.profileImage}</div> : null}




                    <div className='row my-2 g-3'>
                        {Loading ?
                            <button type='button' className='btn btn-outline-success col-12  '><i className='fa fa-spinner fa-spin'></i></button>
                            : <button disabled={!(formik2.isValid && formik2.dirty)} type='submit' className='btn btn-outline-success col-12 '>save changes</button>
                        }
                        <button onClick={() => { setUpdateMood(false) }} type='reset' className='btn mx-auto btn-outline-danger col-12 '>cancel</button>

                    </div>

                </form>
            </div>
        </div> : null}
        {UpdatePasssMood ? <div className='w-100 h-100  bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
            <div className="col-4 formRes">
                <form onSubmit={formik.handleSubmit} className='w-100 my-5 bg-light  p-5 rounded-3 shadow '>

                    <label for="currentPassword" class="form-label">currentPassword</label>
                    <input className='form-control' type="password" name='currentPassword' id='currentPassword' value={formik.values.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.currentPassword && formik.touched.currentPassword ? <div className='form-text text-danger'>{formik.errors.currentPassword}</div> : null}

                    <label for="newPassword" class="form-label">newPassword</label>
                    <input className='form-control' type="password" name='newPassword' id='newPassword' value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.newPassword && formik.touched.newPassword ? <div className='form-text text-danger'>{formik.errors.newPassword}</div> : null}

                    <label for="newPasswordConfirm" class="form-label">newPasswordConfirm</label>
                    <input className='form-control' type="password" name='newPasswordConfirm' id='newPasswordConfirm' value={formik.values.newPasswordConfirm} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.newPasswordConfirm && formik.touched.newPasswordConfirm ? <div className='form-text text-danger'>{formik.errors.newPasswordConfirm}</div> : null}



                    <div className='row my-2 g-3'>
                        {Loading ?
                            <button type='button' className='btn btn-outline-success col-12  '><i className='fa fa-spinner fa-spin'></i></button>
                            : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-outline-success col-12 '>save changes</button>
                        }
                        <button onClick={() => { setUpdatePassMood(false) }} type='reset' className='btn mx-auto btn-outline-danger col-12 '>cancel</button>

                    </div>

                </form>
            </div>
        </div> : null}

        <div className=' w-100'>
            <h1 className='text-center'>Profile</h1>
            
            <div className='col-11 bg-light shadow-lg  mx-auto justify-content-evenly  p-5 rounded-5 mt-5 '>
                <div className="row profileRes">
                    <div className='col-4 profileRes1  mx-auto'>
                        <div className='text-center  p-3 shadow-lg rounded-4'>
                            <div className='col-9 mx-auto'>

                                <img className='img-fluid rounded-circle shadow-lg ' src={ProfileList.profileImage} alt="" />
                            </div>
                            <h3 className='mt-3 fw-bolder text-capitalize'>{ProfileList.name}</h3>
                            <p>{ProfileList.role}</p>
                            <button onClick={() => { setUpdateMood(true) }} className='btn btn-info rounded-5 col-8 my-2'>Update Profile</button>
                        </div>
                    </div>
                    <div className='col-6 profileRes1  align-self-center p-0 text-center mx-auto mt-4'>
                        <table class="table table-striped table-hover text-center shadow-lg">
                            <tbody>
                                <tr className='align-baseline'>
                                    <td >Name</td>
                                    <td>{ProfileList.name}</td>
                                </tr>
                                <tr className='align-baseline'>
                                    <td >Email</td>
                                    <td>{ProfileList.email}</td>
                                </tr>
                                <tr className='align-baseline'>
                                    <td >Role</td>
                                    <td>{ProfileList.role}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="row justify-content-evenly">
                            <button onClick={() => { setUpdatePassMood(true) }} className='btn btn-warning  col-5 rounded-5'>Update Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
