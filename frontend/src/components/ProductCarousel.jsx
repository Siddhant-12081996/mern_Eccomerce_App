import React from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/esm/Image";
import { useSelector } from "react-redux";

const ProductCarousel = () => {
  const { isLoading, error, products_Array } = useSelector(
    (state) => state.products
  );

  return (
    <Container>
    <Carousel data-bs-theme="dark" className="mb-4">
      {products_Array.map((caro, i) => (
        <Carousel.Item key={i}>
          <Image
            className="d-block w-100"
            src={caro.image}
            alt={caro.name}
            style={{ maxHeight: "500px" }}
          />
          <Carousel.Caption className="carousel-caption">
            <h6 className="text-black text-center">
              {caro.name} (₹{caro.price}){" "}
            </h6>{" "}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
    </Container>
  );
};

export default ProductCarousel;
