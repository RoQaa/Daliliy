import React from 'react'
import error404 from '../../images/error.svg'
export default function NotFound() {
  return <>
  <div className='container text-center'>
    <img src={error404} className='w-75' alt="" />
  </div>
  </>
}
