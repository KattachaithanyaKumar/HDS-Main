import React, { useState, useEffect } from 'react'
import "./Home.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from "react-bootstrap/Carousel"
import { Link } from "react-router-dom"

import client, { urlFor } from '../../client'
import Navbar from '../../components/Navbar';
import CatagoryBox from '../../components/catagoryBox';

import logo from "../../assets/HDS Logo.png"

const Home = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [bannerData, setBannerData] = useState(null);
  const [catagoriesData, setCatalogData] = useState(null);

  useEffect(() => {
    //banner
    client
      .fetch("*[_type == 'banner']")
      .then((data) => {
        let mappedBannerData = Object.entries(data).map(([key, value]) => {
          return {id: key, ...value};
        })
        // console.log(mappedBannerData)
        setBannerData(mappedBannerData) 
      })
      .catch((err) => console.error(err));

    //catagories
    client
      .fetch("*[_type == 'category']")
      .then((data) => {
        let mappedCatagoryData = Object.entries(data).map(([key, value]) => {
          return {id: key, ...value};
        })
        // console.log(mappedCatagoryData)
        setCatalogData(mappedCatagoryData)
      })
      .catch((err) => console.error(err));

    //popular products
    //i have to equate the _ref from the popular to the _id from the product
    //like *[_type == "popular"]{products} this will give me the list of products and i have to run
    //*[_type == "product"] and do data._id == popular._ref using filter

    if (bannerData != null && catagoriesData != null) setPageLoading(false);
  }, [])

  return (
    <div>
      <Navbar />
      <Carousel fade interval={3000} className='carousel'>
        {bannerData?.map((item) => (
          <Carousel.Item key={item.id}>
            <img 
              className='d-block w-100 carousel-image'
              src={urlFor(item.image.asset._ref)} 
              alt={item.title} 
            />
            <Carousel.Caption>
              <div className="captions">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="catagories">
        {catagoriesData?.map((item) => (
          <Link to={`/${item.name}/${item._id}`}
          state={{image: item.image.asset._ref}}
          key={item.id} 
          >
            <CatagoryBox>
              <div className='overlay'></div>
              <img 
                src={urlFor(item.image.asset._ref)} 
                alt={item.title} 
              />
              <h1>{item.name}</h1>
            </CatagoryBox>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home