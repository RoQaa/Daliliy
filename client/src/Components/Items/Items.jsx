import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Items.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllItems } from '../../redux/slices/ItemsSlice.js';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { Link } from 'react-router-dom';
import request from 'superagent';


export default function Items({ setUserData }) {
    const [UpdateMood, setUpdateMood] = useState(false)
    const [AddMood, setAddMood] = useState(false)
    const [AddImageMood, setAddImageMood] = useState(false)
    const [categoryList, setcategoryList] = useState([])
    const [ItemsList, setItemsList] = useState([])



    const [Loading, setLoading] = useState(false)

    const [GetLoading, setGetLoading] = useState(false)


    let token = localStorage.getItem('userToken')
    let headers = {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
    }

    // let { ItemsList, loading, authError, authErrorMsg } = useSelector((state) => state.ItemReduser)
    let dispatch = useDispatch()



    async function getAllItems() {
        setGetLoading(true)
        let token = localStorage.getItem('userToken')
        let headers = {
            Authorization: `Bearer ${token}`
        }
        await axios.get('https://dalilalhafr.com/api/items/getAllitems', { headers }).catch((err) => {
            if (err?.response?.status == 401) {
                localStorage.clear()
                setUserData(null)
                setGetLoading(false)
                toast.error(err?.response?.data?.message)
            } else {
                setGetLoading(false)
                toast.error(err?.response?.data?.message)
            }

        }).then((res) => {
            setItemsList(res?.data?.data)
            setGetLoading(false)
        })



    }
    useEffect(() => {
        getAllItems()
        getCategories()
    }, [])
    async function getCategories() {
        await axios('https://dalilalhafr.com/api/cats/getCats', { headers }).catch((err) => {
            if (err?.response?.status == 401) {
                localStorage.clear()
                setUserData(null)
                toast.error(err?.response?.data?.message)
            } else {

                toast.error(err?.response?.data?.message)
            }
        }).then((res) => {
            setcategoryList(res?.data?.data)
        })

    }
    async function handleUpdate(values) {
        setLoading(true)
        const formData = new FormData();
        formData.append('backGroundImage', values.backGroundImage);
        for (let index = 0; index < values.images.length; index++) {
            formData.append(`images`, values.images[index]);

        }
        formData.append('name', values.name)
        formData.append('description', values.description)
        formData.append('About', values.About)
        formData.append('category', values.category)
        const url = `https://dalilalhafr.com/api/items/updateItem/${values._id}`;
        try {
            const response = await request
                .patch(url)
                .set('Authorization', `Bearer ${token}`)
                .send(formData);

            toast.success(response?.body?.message)
            getAllItems();
            setLoading(false);
            setUpdateMood(false);
        } catch (error) {
            if (error?.response?.status == 401) {
                localStorage.clear()
                setUserData(null)
                toast.error(error?.response?.data?.message)
            } else {

                toast.error(error?.response?.data?.message)
            }
        }
    }
    const updateItem = (index) => {
        setUpdateMood(true)
        const selectedItem = ItemsList[index];
        formik4.setValues({
            _id: selectedItem._id,
            name: selectedItem.name,
            description: selectedItem.description,
            About: selectedItem.About
        });
    };
    let validationUpdateSchema = Yup.object({
        name: Yup.string().required('name is required'),
        description: Yup.string().required('description is required'),
        About: Yup.string().required('description is required'),
        category: Yup.string().required('category is required'),
        backGroundImage: Yup.mixed().required('backGroundImage is required'),
        images: Yup.mixed().required('images is required')
    })
    let formik4 = useFormik({
        initialValues: {
            item: {
                _id: "",
                name: "",
                description: "",
                About: "",
                category: "",
                backGroundImage: "",
                images: []
            }
        },
        onSubmit: handleUpdate,
        validationSchema: validationUpdateSchema
    })
    async function handleAdd(values) {
        setLoading(true)
        await axios.post(`https://dalilalhafr.com/api/items/addItem`, {
            name: values.name,
            description: values.description,
            category: values.category,
            About: values.About

        }, { headers }).catch((err) => {
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
            formik2.resetForm()
            toast.success(res?.data?.message)
            setLoading(false)
            setAddMood(false)
            setAddImageMood(true)
            formik3.setValues({
                _id: res?.data?.data?._id
            })
            getAllItems()
        })


    }
    let validationAddSchema = Yup.object({
        name: Yup.string().required('name is required'),
        description: Yup.string().required('description is required'),
        About: Yup.string().required('About is required'),
        category: Yup.string().required('category is required'),
    })
    let formik2 = useFormik({
        initialValues: {
            item: {
                name: "",
                description: "",
                About: "",
                category: "",
            }
        }
        ,
        onSubmit: handleAdd,
        validationSchema: validationAddSchema
    })
    async function deleteItem(index) {
        await axios.delete(`https://dalilalhafr.com/api/items/deleteItem/${index}`, { headers }).catch((err) => {
            if (err?.response?.status == 401) {
                localStorage.clear()
                setUserData(null)
                toast.error(err?.response?.data?.message)
            } else {
                toast.error(err?.response?.data?.message)

            }
        }).then((res) => {
            toast.success(res?.data?.message)
            getAllItems()
        })


    }
    let validationAddImageSchema = Yup.object({
        backGroundImage: Yup.mixed().required('backGround Image is required'),
        images: Yup.mixed().required('images is required please upload at least one image')
    })
    let formik3 = useFormik({
        initialValues: {
            item: {
                _id: "",
                backGroundImage: "",
                images: []
            }
        }
        ,
        onSubmit: handleAddImage,
        validationSchema: validationAddImageSchema
    })
    async function handleAddImage(values) {
        setLoading(true)

        const formData = new FormData();
        formData.append('backGroundImage', values.backGroundImage);
        if (values.images) {
            for (let index = 0; index < values.images.length; index++) {
                formData.append(`images`, values.images[index]);

            }
        }

        // const token = 'your-auth-token'; // Replace with your actual authentication token
        const url = `https://dalilalhafr.com/api/items/updateItem/${values._id}`;

        try {
            const response = await request
                .patch(url)
                .set('Authorization', `Bearer ${token}`)
                .send(formData);

            toast.success(response?.body?.message)
            setLoading(false);
            dispatch(getAllItems());
            setAddImageMood(false);
        } catch (error) {
            if (error?.response?.status == 401) {
                localStorage.clear()
                setUserData(null)
                toast.error(error?.response?.data?.message)
                setLoading(false)
            } else {
                toast.error(error?.response?.data?.message)
                setLoading(false)
            }
        }
    };

    return <>

        {UpdateMood ?
            <div className='w-100 h-100  bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
                <div className="col-4 formRes">

                    <form onSubmit={formik4.handleSubmit} className='w-100 my-5 bg-light  p-5 rounded-3 shadow '>

                        <label for="name" className="form-label">name</label>
                        <input className='form-control' type="text" name='name' id='name' value={formik4.values.name} onChange={formik4.handleChange} onBlur={formik4.handleBlur} />
                        {formik4.errors.name && formik4.touched.name ? <div className='form-text text-danger'>{formik4.errors.name}</div> : null}

                        <label for="description" className="form-label">description</label>
                        <input className='form-control' type="text" name='description' id='description' value={formik4.values.description} onChange={formik4.handleChange} onBlur={formik4.handleBlur} />
                        {formik4.errors.description && formik4.touched.description ? <div className='form-text text-danger'>{formik4.errors.description}</div> : null}

                        <label for="About" className="form-label">About</label>
                        <input className='form-control' type="text" name='About' id='About' value={formik4.values.About} onChange={formik4.handleChange} onBlur={formik4.handleBlur} />
                        {formik4.errors.About && formik4.touched.About ? <div className='form-text text-danger'>{formik4.errors.About}</div> : null}

                        <label for="category" className="form-label mt-2">category</label>
                        <select className="form-select" aria-label="Default select example" name='category' id='category' value={formik4.values.category} onChange={formik4.handleChange} onBlur={formik4.handleBlur}>

                            <option disabled selected>select Category</option>
                            {categoryList.map((cate) => {
                                return <option value={cate?._id}>{cate?.title}</option>
                            })}

                        </select>
                        {formik4.errors.category && formik4.touched.category ? <div className='form-text text-danger'>{formik4.errors.category}</div> : null}
                        <label for="backGroundImage" className="form-label">backGroundImage</label>
                        <input
                            type="file"
                            name="backGroundImage"
                            className='form-control'
                            onChange={(event) => formik4.setFieldValue('backGroundImage', event.currentTarget.files[0])}
                            onBlur={formik4.handleBlur}
                        />
                        <label for="images" className="form-label">images</label>
                        <input
                            type="file"
                            name="images"
                            className='form-control'
                            onChange={(event) => formik4.setFieldValue('images', event.currentTarget.files)}
                            onBlur={formik4.handleBlur}
                            multiple
                        />
                        <div className='row my-2 g-3'>

                            {Loading ?
                                <button type='button' className='btn btn-outline-success col-12  '><i className='fa fa-spinner fa-spin'></i></button>
                                : <button disabled={!(formik4.isValid && formik4.dirty)} type='submit' className='btn btn-outline-success col-12 '>save changes</button>
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

                        <label for="name" className="form-label">name</label>
                        <input className='form-control' type="text" name='name' id='name' value={formik2.values.name} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
                        {formik2.errors.name && formik2.touched.name ? <div className='form-text text-danger'>{formik2.errors.name}</div> : null}

                        <label for="description" className="form-label mt-2">description</label>
                        <input className='form-control' type="text" name='description' id='description' value={formik2.values.description} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
                        {formik2.errors.description && formik2.touched.description ? <div className='form-text text-danger'>{formik2.errors.description}</div> : null}

                        <label for="About" className="form-label mt-2">About</label>
                        <input className='form-control' type="text" name='About' id='About' value={formik2.values.About} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
                        {formik2.errors.About && formik2.touched.About ? <div className='form-text text-danger'>{formik2.errors.About}</div> : null}

                        <label for="category" className="form-label mt-2">category</label>


                        <select className="form-select" aria-label="Default select example" name='category' id='category' value={formik2.values.category} onChange={formik2.handleChange} onBlur={formik2.handleBlur}>

                            <option disabled selected>select Category</option>
                            {categoryList.map((cate) => {
                                return <option value={cate._id}>{cate.title}</option>
                            })}

                        </select>
                        {formik2.errors.category && formik2.touched.category ? <div className='form-text text-danger'>{formik2.errors.category}</div> : null}







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

                        <label for="backGroundImage" className="form-label">backGroundImage</label>
                        <input
                            type="file"
                            name="backGroundImage"
                            className='form-control'
                            onChange={(event) => formik3.setFieldValue('backGroundImage', event.currentTarget.files[0])}
                            onBlur={formik3.handleBlur}
                        />



                        <label for="images" className="form-label">images</label>
                        <input
                            type="file"
                            name="images"
                            className='form-control'
                            onChange={(event) => formik3.setFieldValue('images', event.currentTarget.files)}
                            onBlur={formik3.handleBlur}
                            multiple
                        />



                        <div className='row my-2 g-3'>
                            {Loading ?
                                <button type='button' className='btn btn-outline-success col-12  '><i className='fa fa-spinner fa-spin'></i></button>
                                : <button disabled={!(formik3.isValid && formik3.dirty)} type='submit' className='btn btn-outline-success col-12 '>Add images</button>

                            }
                            <button onClick={() => { setAddImageMood(false) }} type='reset' className='btn mx-auto btn-outline-danger col-12 '>cancel</button>
                        </div>

                    </form>
                </div>
            </div>
            : null}

        <div className="ItemComponent">
            <h1 className='text-center'>Items</h1>
            {GetLoading ? <div className='col-12 text-center my-5 py-5'>
                <i className='fa fa-spin fa-spinner fa-3x text-success'></i>
            </div> : <div className='col-11 mx-auto my-5 tableCss'>
                <button onClick={() => { setAddMood(true) }} className='btn btn-outline-success w-100'>Add new Item</button>
                {ItemsList.length ? <table className="table table-striped table-hover text-center my-3">
                    <thead>
                        <tr className='text-capitalize'>
                            <th scope="col">#</th>
                            <th scope="col">name</th>
                            <th scope="col">background image</th>
                            <th scope="col">category</th>

                            <th scope="col">ratings Average</th>
                            <th scope="col">ratings Quantity</th>
                            <th scope="col-5">Actions</th>


                        </tr>
                    </thead>
                    <tbody>




                        {ItemsList.map((item, index) => {
                            return <tr key={item._id} className='align-baseline'>
                                <td scope="col">{index + 1}</td>
                                <td>{item.name}</td>
                                <td><img className='item-img img-fluid' src={item.backGroundImage} alt="" /></td>
                                <td >{item?.category?.title}</td>

                                <td ><i className='fa fa-star text-warning mx-2'></i>
                                    {item.ratingsAverage}</td>
                                <td >{item.ratingsQuantity}</td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-outline-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fa-solid fa-list fa-lg"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li onClick={() => deleteItem(item._id)} className="dropdown-item">Delete</li>
                                            <li onClick={() => updateItem(index)} className="dropdown-item">Update</li>
                                            <li className="dropdown-item"><Link to={'/oneItem/' + item._id} className='text-decoration-none text-black'>Details</Link></li>


                                        </ul>
                                    </div>

                                </td>

                            </tr>
                        })}




                    </tbody>
                </table> : <h2 className='text-center my-5'>No items</h2>}


            </div>}
        </div>


    </>
}




















