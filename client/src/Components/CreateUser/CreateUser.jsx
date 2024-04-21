import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast";

export default function CreateUser() {
    let navigate = useNavigate()
    const [Loading, setLoading] = useState(false)


    let token = localStorage.getItem('userToken')
    let headers = {
        Authorization: `Bearer ${token}`
    }

    async function handleUpdate(values) {
        setLoading(true)
        let { data } = await axios.post(`https://dalilalhafr.com/api/auth/createAccount`, {
            name: values.name,
            email: values.email,
            password: values.password,
            passwordConfirm: values.passwordConfirm,
            role: values.role

        }, { headers }).catch((err)=>{
            toast.success('email is alerady exist')
            setLoading(false)

        })
        formik.resetForm();
        setLoading(false)
        navigate('/')
        toast.success(data.message)
    }

    let validationSchema = Yup.object({
        name: Yup.string().required('name is required'),
        email: Yup.string().required('email is required'),
        password: Yup.string().required('password is required'),
        passwordConfirm: Yup.string().required('passwordConfirm is required'),
        role: Yup.string().required('role is required'),

    })

    let formik = useFormik({
        initialValues: {
            user: {
                name: "",
                email: "",
                password: "",
                passwordConfirm: "",
                role: ""

            }
        }
        ,
        onSubmit: handleUpdate,
        validationSchema
    })



    return (
        <div className='col-8 mx-auto tableCss'>
            <h1 className='text-center'>Create User</h1>

            <form onSubmit={formik.handleSubmit} className='w-100 my-5  p-5 rounded-3 shadow '>

                <label for="name" class="form-label">Name</label>
                <input className='form-control' type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.name && formik.touched.name ? <div className='form-text text-danger'>{formik.errors.name}</div> : null}

                <label for="email" class="form-label mt-2 ">Email</label>
                <input className='form-control' type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.email && formik.touched.email ? <div className='form-text text-danger'>{formik.errors.email}</div> : null}

                <label for="password" class="form-label mt-2 ">password</label>
                <input className='form-control' type="password" name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.password && formik.touched.password ? <div className='form-text text-danger'>{formik.errors.password}</div> : null}


                <label for="passwordConfirm" class="form-label mt-2 ">passwordConfirm</label>
                <input className='form-control' type="password" name='passwordConfirm' id='passwordConfirm' value={formik.values.passwordConfirm} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.passwordConfirm && formik.touched.passwordConfirm ? <div className='form-text text-danger'>{formik.errors.passwordConfirm}</div> : null}



                <div className='row mt-2 d-flex align-items-baseline'>
                    <div className='col-4 '>
                        <label for="role" className="form-label mt-2">Role</label>
                    </div>
                    <div className='col-4 '>
                        <div>
                            <input type='radio' id='role-admin' name='role' value='admin' checked={formik.values.role === 'admin'} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-check-label mx-2' />
                            <label htmlFor='role-admin'>Admin</label>
                        </div>
                    </div>

                    <div className='col-4 '>
                        <div>
                            <input type='radio' id='role-user' name='role' value='user' checked={formik.values.role === 'user'} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-check-label mx-2' />
                            <label htmlFor='role-user'>User</label>
                        </div>

                    </div>
                    {formik.errors.role && formik.touched.role ? <div className='form-text text-danger'>{formik.errors.role}</div> : null}

                    <div className='col-12'>
                        {formik.errors.status && formik.touched.status ? <div className='form-text text-danger'>{formik.errors.status}</div> : null}
                    </div>

                </div>

                <div className='row my-2 g-3'>
                    {Loading ?
                        <button type='button' className='btn btn-outline-success col-12  '><i className='fa fa-spinner fa-spin'></i></button>
                        : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-outline-success col-12 '>Add</button>


                    }

                </div>

            </form>

        </div>
    )
}
