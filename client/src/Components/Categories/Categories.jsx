import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Categories.css'
import axios from "axios";
import { toast } from "react-hot-toast";



export default function Categories({ setUserData }) {

    const [UpdateMood, setUpdateMood] = useState(false)
    const [AddMood, setAddMood] = useState(false)
    const [AddImageMood, setAddImageMood] = useState(false)
    const [CateId, setCateId] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [CategorysList, setCategorysList] = useState([])
    const [loading, setloading] = useState(false)






    let token = localStorage.getItem('userToken')
    let headers = {
        Authorization: `Bearer ${token}`
    }



    async function getAllCategorys() {
        setloading(true)
        let token = localStorage.getItem('userToken')
        let headers = {
            Authorization: `Bearer ${token}`
        }
        await axios('https://dalilalhafr.com/api/cats/getCats', { headers }).catch((err) => {
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
            setCategorysList(res?.data?.data)
            setloading(false)
        })



    }
    useEffect(() => {
        getAllCategorys()
    }, [])
    async function handleUpdate(values) {
        setLoading(true)
        let formData = new FormData();
        formData.append('title', values.title);
        if (values.image != "") {
            formData.append('image', values.image);
        }
        await axios.patch(`https://dalilalhafr.com/api/cats/updateCategory/${values._id}`, formData, { headers }).catch((err) => {
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
            formik.resetForm()
            toast.success(res?.data?.message)
            getAllCategorys()
            setLoading(false)
            setUpdateMood(false)
        })


    }
    let validationSchema = Yup.object({
        title: Yup.string().required('title is required'),
        image: Yup.mixed().required('Image is required'),

    })
    let formik = useFormik({
        initialValues: {
            category: {
                _id: "",
                title: "",
                image: ""
            }
        }
        ,
        onSubmit: handleUpdate,
        validationSchema
    })
    const updateCate = (index) => {
        setUpdateMood(true)
        const selectedItem = CategorysList[index];
        formik.setValues({
            _id: selectedItem._id,
            title: selectedItem.title,

        });
    };
    async function deleteCate(index) {
        await axios.delete(`https://dalilalhafr.com/api/cats/deleteCategory/${index}`, { headers }).catch((err) => {
            if (err?.response?.status == 401) {
                localStorage.clear()
                setUserData(null)
                toast.error(err?.response?.data?.message)
            } else {
                toast.error(err?.response?.data?.message)
            }
        }).then((res) => {
            toast.success(res?.data?.message)
            getAllCategorys()
        })






    }


    async function handleAdd(values) {
        setLoading(true)
        await axios.post(`https://dalilalhafr.com/api/cats/addCat`, { title: values.title }, { headers }).catch((err) => {
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
            if (res?.data?.status == false) {
                toast.error(res?.data?.message)
            }
            setCateId(res?.data?.data?._id)
            setLoading(false)
            setAddMood(false)
            setAddImageMood(true)
            toast.success(res?.data?.message)
            formik2.resetForm()
        })


    }

    let validationAddSchema = Yup.object({
        title: Yup.string().required('title is required'),
    })
    let formik2 = useFormik({
        initialValues: {
            category: {
                title: ""
            }
        }
        ,
        onSubmit: handleAdd,
        validationAddSchema
    })


    let validationAddImageSchema = Yup.object({
        image: Yup.mixed().required('Image is required'),
    })
    let formik3 = useFormik({
        initialValues: {
            category: {
                image: ""
            }
        }
        ,
        onSubmit: handleAddImage,
        validationAddImageSchema
    })
    async function handleAddImage(values) {
        setLoading(true)

        let formData = new FormData();

        formData.append('image', values.image);
        await axios.patch(`https://dalilalhafr.com/api/cats/updateCategory/${CateId}`, formData, { headers }).catch((err) => {
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
            if (res?.data?.status == false) {
                toast.error(res?.data?.message)
                setCateId(null)

            } else if (res?.data?.status == true) {
                toast.success(res?.data?.message)
                setCateId(null)
            }
            getAllCategorys()
            setLoading(false)
            setAddImageMood(false)
            formik3.resetForm()
        })
    }
    return <>
        {UpdateMood ?
            <div className='w-100 h-100  bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
                <div className="col-4 formRes">

                    <form onSubmit={formik.handleSubmit} className='w-100 my-5 bg-light  p-5 rounded-3 shadow '>

                        <label for="title" class="form-label">Title</label>
                        <input className='form-control' type="text" name='title' id='title' value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.title && formik.touched.title ? <div className='form-text text-danger'>{formik.errors.title}</div> : null}

                        <label for="image" class="form-label">Image</label>
                        <input
                            type="file"
                            name="image"
                            className='form-control'
                            onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.image && formik.touched.image ? <div className='form-text text-danger'>{formik.errors.image}</div> : null}





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
        {AddMood ?
            <div className='w-100 h-100  bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
                <div className="col-4 formRes">

                    <form onSubmit={formik2.handleSubmit} className='w-100 my-5 bg-light  p-5 rounded-3 shadow '>

                        <label for="title" class="form-label">Title</label>
                        <input className='form-control' type="text" name='title' id='title' value={formik2.values.title} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />

                        {formik2.errors.title && formik2.touched.title ? <div className='form-text text-danger'>{formik2.errors.title}</div> : null}






                        <div className='row my-2 g-3'>
                            {Loading ?
                                <button type='button' className='btn btn-outline-success col-12  '><i className='fa fa-spinner fa-spin'></i></button>
                                : <button disabled={!(formik2.isValid && formik2.dirty)} type='submit' className='btn btn-outline-success col-12 '>Next</button>


                            }
                            <button onClick={() => { setAddMood(false) }} type='reset' className='btn mx-auto btn-outline-danger col-12 '>cancel</button>

                        </div>

                    </form>

                </div>
            </div>
            : null}
        {AddImageMood ?
            <div className='w-100 h-100  bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
                <div className="col-4 formRes">

                    <form onSubmit={formik3.handleSubmit} className='w-100 my-5 bg-light  p-5 rounded-3 shadow '>

                        <label for="image" class="form-label">Image</label>
                        <input
                            type="file"
                            name="image"
                            className='form-control'
                            onChange={(event) => formik3.setFieldValue('image', event.currentTarget.files[0])}
                            onBlur={formik3.handleBlur}
                        />

                        {formik3.errors.image && formik3.touched.image ? <div className='form-text text-danger'>{formik3.errors.image}</div> : null}






                        <div className='row my-2 g-3'>
                            {Loading ?
                                <button type='button' className='btn btn-outline-success col-12  '><i className='fa fa-spinner fa-spin'></i></button>
                                : <button disabled={!(formik3.isValid && formik3.dirty)} type='submit' className='btn btn-outline-success col-12 '>upload image</button>
                            }
                            <button onClick={() => { setAddImageMood(false) }} type='reset' className='btn mx-auto btn-outline-danger col-12 '>cancel</button>
                        </div>
                    </form>

                </div>
            </div>
            : null}

        <h1 className='text-center'>Categories</h1>
        {loading ? <div className='col-12 text-center my-5 py-5'>
            <i className='fa fa-spin fa-spinner fa-3x text-success'></i>
        </div> : <div className='col-11 tableCss mx-auto my-5'>


            <button onClick={() => { setAddMood(true) }} className='btn btn-outline-success w-100'>Add new Categore</button>

            {CategorysList.length ? <table class="table table-striped table-hover text-center my-3">
                <thead>
                    <tr className='text-capitalize'>
                        <th scope="col-2">#</th>
                        <th scope="col-2">title</th>
                        <th scope="col-2">image</th>
                        <th scope="col-6">Actions</th>


                    </tr>
                </thead>
                <tbody>

                    {CategorysList.map((cate, index) => {
                        return <tr key={cate._id} className='align-baseline '>
                            <th scope="row">{index}</th>
                            <td>{cate.title}</td>
                            <td><img className='cate-img img-fluid' src={cate.image} alt="" /></td>

                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-outline-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-list fa-lg"></i>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li onClick={() => deleteCate(cate._id)} className="dropdown-item">delete</li>
                                        <li onClick={() => updateCate(index)} className="dropdown-item">update</li>
                                    </ul>
                                </div>
                            </td>

                        </tr>
                    })}





                </tbody>
            </table> : <h2 className='text-center my-5'>No Categories</h2>}


        </div>}




    </>

}
