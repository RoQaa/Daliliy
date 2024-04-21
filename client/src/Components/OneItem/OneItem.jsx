import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneItem } from '../../redux/slices/ItemsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import img from '../../images/blog-img-1.jpeg'
import img2 from '../../images/error.svg'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';


export default function OneItem() {
  const [UpdateMood, setUpdateMood] = useState(false)
  const [Loading, setLoading] = useState(false)


  let token = localStorage.getItem('userToken')
  let headers = {
    // 'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`
  }
  let { id } = useParams()
  let dispatch = useDispatch()
  let { OneItemData } = useSelector((state) => state.ItemReduser)




  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray", borderRadius: "50%", paddingTop: "1px" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray", borderRadius: "50%", paddingTop: "1px" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };


  async function deleteReview(index) {
    let { data } = await axios.delete(`https://dalilalhafr.com/api/reviews/deleteReview/${index}`, { headers })
    toast.success(data.message)
    dispatch(getOneItem(id))
  }

  useEffect(() => {
    dispatch(getOneItem(id))


  }, [])




  async function handleUpdate(values) {
    setLoading(true)
    let { data } = await axios.patch(`https://dalilalhafr.com/api/reviews/updateReview/${values._id}`, {
      review: values.review,
      rating: values.rating
    }, { headers })
    formik.resetForm()

    dispatch(getOneItem(id))
    setLoading(false)
    toast.success(data.message)
    setUpdateMood(false)
  }
  let validationSchema = Yup.object({
    review: Yup.string().required('review is required'),
    rating: Yup.number().required('rating is required'),

  })
  let formik = useFormik({
    initialValues: {
      category: {
        _id: "",
        review: "",
        rating: ""
      }
    }
    ,
    onSubmit: handleUpdate,
    validationSchema
  })

  const updateCate = (_id, review, rating) => {
    setUpdateMood(true)
    formik.setValues({
      _id: _id,
      review: review,
      rating: rating

    });
  };




  return <>
    {UpdateMood ?
      <div className='w-100 h-100  bg-body-secondary bg-opacity-50 fixed-top row justify-content-center align-content-center'>
        <div className=' col-4 formRes'>
          <form onSubmit={formik.handleSubmit} className='w-100 my-5  p-5 rounded-3 shadow bg-light'>

            <label for="review" class="form-label">review</label>
            <input className='form-control' type="text" name='review' id='review' value={formik.values.review} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.review && formik.touched.review ? <div className='form-text text-danger'>{formik.errors.review}</div> : null}

            <label for="rating" class="form-label">rating</label>
            <input className='form-control' type="text" name='rating' id='rating' value={formik.values.rating} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.rating && formik.touched.rating ? <div className='form-text text-danger'>{formik.errors.rating}</div> : null}
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


    <div className="row container OneItemRes mx-auto align-items-center g-5 py-5 my-5">
      <div className="col-md-6 col-lg-4 formRes ">
        <div className='shadow-lg rounded-3 overflow-hidden p-5 h-75'>
          <Slider {...settings}>
            <img src={OneItemData.backGroundImage} alt="" srcset="" />
            {OneItemData?.images?.map(img => {
              return <img src={img} />
            })}

          </Slider>
        </div>
      </div>
      <div className="col-md-6 col-lg-8 formRes">
        <h3 className='fw-bolder'>{OneItemData.name}</h3>
        <h6 className='py-2'>{OneItemData.description}</h6>
        <span className='text-main'>{OneItemData.category?.title}</span>
        <p>{OneItemData.About}</p>
        <div className='d-flex justify-content-between py-2'>
          <span>
            <i className='fa fa-star text-warning mx-2'></i>
            {OneItemData.ratingsAverage}
          </span>
        </div>

        <div className='p-5 shadow-lg rounded-3'>



          <h2 className='mb-4'>Reviews</h2>
          {OneItemData.reviews?.length ?
            OneItemData.reviews.map(review => {
              return <div key={review._id} className="card my-3">
                <div className=" card-header">
                  <div className="row align-items-center">

                    <div className='col-1'>
                      <img src={review?.user?.profileImage} className='img-fluid rounded-circle' alt="" srcset="" />
                    </div>
                    <div className="col-10 ">
                      <h5 className="">{review?.user?.name}</h5>
                    </div>
                    <div className="col-1 ms-auto">
                      <div class="dropdown ">
                        <button class="btn btn-outline-secondary " data-bs-toggle="dropdown" aria-expanded="false" type="button" >
                          <i class="fa-solid fa-list fa-lg" ></i>
                        </button>
                        <ul class="dropdown-menu">
                          <li className="dropdown-item" onClick={() => { deleteReview(review?._id) }}>delete</li>
                          <li className="dropdown-item" onClick={() => { updateCate(review._id, review.review, review.rating) }}>update</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="card-body">
                  <div className="row justify-content-evenly">
                    <div className='col-9' >
                      <h6 className="card-title">{review?.review}</h6>

                    </div>
                    <div className='col-2'>
                      <span>
                        <i className='fa fa-star text-warning mx-2'></i>
                        {review?.rating}
                      </span>
                    </div>


                  </div>
                </div>
              </div>
            })
            : <>
              <h2 className='text-center text-black-50'>this item don't have review</h2>
            </>}

        </div>


      </div>
    </div>
  </>
}
