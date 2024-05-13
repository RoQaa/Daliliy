import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import logo from '../../images/logo_login.jpeg'
import { toast } from "react-hot-toast";

export default function Login({ saveData }) {
  let navigate = useNavigate()



  const [messageErr2, setmessageErr2] = useState('')
  const [loading, setloading] = useState(false)


  async function handelLogin(values) {
    setloading(true)
    let { data } = await axios.post('https://dalilalhafr.com/api/auth/login', values).catch((err) => {
      setmessageErr2(`${err.response.data.message}`)
      setloading(false)
      toast.error("srever error please try again")
    })

    if (data.status == true) {
      if (data.data.role == 'user') {
        setmessageErr2(`you should be admin or manger`)
        setloading(false)

      } else {
        setmessageErr2(``)
        localStorage.setItem('userToken', data.token)
        saveData()
        navigate('/')
        setloading(false)
        toast.success(data.message)
      }

    }

  }

  let validationSchema2 = Yup.object({
    email: Yup.string().required('email is required').email('email is invalid'),
    password: Yup.string().required('pass is required'),
  })

  let formik2 = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema2,
    onSubmit: handelLogin

  })
useEffect(() => {
  if (localStorage.getItem('userToken') != null) {
    navigate('/')
  }

}, [])


  return <>
    <div className=' '>
      <div className='col-10   mx-auto'>
      <div className='col-md-4  pb-3  mx-auto '>
        <img src={logo} className='img-fluid  ' alt="" srcset="" />
      </div>
      </div>
      

      <div className='col-md-5 mx-auto px-0 '>
        <form onSubmit={formik2.handleSubmit} className='w-100 mx-auto  shadow-lg p-4 rounded-4 '>
          <h3 className='text-center py-3'>Login</h3>

          {messageErr2 !== '' ? <div className='alert alert-danger'>{messageErr2}</div> : null}


          <input placeholder='Email' className='form-control mb-2' type="email" name='email' id='email' value={formik2.values.email} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
          {formik2.errors.email && formik2.touched.email ? <div className='alert alert-danger'>{formik2.errors.email}</div> : null}


          <input placeholder='Password' className='form-control mb-2 my-3' type="password" name='password' id='password' value={formik2.values.password} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
          {formik2.errors.password && formik2.touched.password ? <div className='alert alert-danger'>{formik2.errors.password}</div> : null}


          {loading ?
            <button type='button' className='btn btn-outline-success w-100 my-2 '><i className='fa fa-spinner fa-spin'></i></button>
            : <button disabled={!(formik2.isValid && formik2.dirty)} type='submit' className='btn btn-outline-success w-100  my-2'>Login</button>
          }  </form>
      </div></div>
  </>
}
