import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import "../css/ProductDetails.css"

const Rating = () => {

    const {productDetails,isLoading,error} = useSelector((state) =>({...state.products}))

  return (
    <Container className='rating' >
      <span>
        {productDetails.rating >= 1 ? (
          <FaStar/>
        ) : productDetails.rating >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {productDetails.rating >= 2 ? (
          <FaStar />
        ) : productDetails.rating >= 1.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {productDetails.rating >= 3 ? (
          <FaStar />
        ) : productDetails.rating >= 2.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {productDetails.rating >= 4 ? (
          <FaStar />
        ) : productDetails.rating >= 3.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {productDetails.rating >= 5 ? (
          <FaStar />
        ) : productDetails.rating >= 4.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className='rating-text'>{productDetails.numReviews && productDetails.numReviews} <span className="nameReview">reviews</span></span>
    </Container>

  )
}



export default Rating