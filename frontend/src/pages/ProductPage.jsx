import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import client, { urlFor } from '../client';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from "react-bootstrap/Carousel"
import {RiShoppingCart2Line} from "react-icons/ri"
import { Rate } from "antd"
import ReactImageMagnify from "react-image-magnify"
import { useCart } from 'react-use-cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./productPage.css"

let imageProps = null;

const Product = () => {
  const params = useParams();
  const [productData, setProductData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [gotData, setGotData] = useState(false);

  const { addItem } = useCart();

  useState(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch("*[_type == 'product']")
        let mappedProductsData = Object.entries(data).map(([key, value]) => {
            return {id: key, ...value};
          })
          let product = mappedProductsData.filter(product => product._id === params.productId)
          setProductData(product[0])
          setImageData(product[0].image)

          setGotData(true);
    } catch (err) {
      console.error(err);
    }
  }
    fetchData();
}, []);


  return (
    <div className="product-page">
      <Navbar />

      <div className='product-section'>
        <div className="img-container">
          <Carousel >
            {imageData?.map((item) => (
              <Carousel.Item key={item._key}>
                <img 
                  src={urlFor(item.asset._ref)} 
                  alt={item.asset._ref} 
                  className='product-carousel-image' 
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="details">
          <div className="details-text">
            <h1>{productData?.name} </h1>
            {gotData && (<Rate disabled defaultValue={productData?.rating} />)}
            <p>{productData?.details}</p>
            <h5>₹{productData?.price}</h5>
          </div>
          <div className="details-buttons">
            <button className='cart' onClick={() => {
              addItem(productData)
              toast.success("Successfully added to cart")
            }}>Add to Cart <RiShoppingCart2Line /></button>
            <button className='buy'>Buy Now</button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default Product