import React, { useEffect, useState } from 'react'
import { Link, parsePath, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { Rate } from "antd"
import { useLocation } from 'react-router-dom';
import { useCart } from 'react-use-cart';
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import "./CategoryPage.css";

import client, { urlFor } from '../client';
import category from '../../../backend/homedecorstudio/schemas/category';

const Categorypage = (props) => {
  let params = useParams();
  const location = useLocation();
  // console.log(location.state)
  const imageSrc = location.state?.image;

  const { addItem } = useCart();

  let [productsData, setProductsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(`*[_type == 'product']`);
        let mappedProductsData = Object.entries(data).map(([key, value]) => {
          return {id: key, ...value};
        })
        // console.log("products: ", mappedProductsData)
        let products = mappedProductsData.filter(product => product.category._ref === params.categoryId)
        // console.log(products)
        setProductsData(products)
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='categoryPage'>
      <Navbar />
      {/* <div className="categoryPage-banner">
        <img src={urlFor(imageSrc)} alt="" />
      </div> */}
      <h1>{params.category}</h1>

      <div className="products">
        {productsData?.map((item) => (
          <div className="productCard" key={item.id}>
            <img src={urlFor(item.image[0].asset._ref)} alt={item.name} />
            <div className="productCardDetails">
              <Rate disabled defaultValue={item.rating} />
              <h2>{item.name}</h2>
              <p>₹{item.price}</p>
            </div>
            <div className="product-buttons">
              <button className='cart' onClick={() => {
                addItem(item)
                toast.success("Successfully added to cart")
              }} >add to cart</button>
              <Link to={`${item._id}`} className='buy'>View Item</Link>
            </div>
          </div>
        ))}
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

export default Categorypage