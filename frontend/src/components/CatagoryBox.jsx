import React from 'react'
import "./CatagoryBox.css"

const CatagoryBox = ({children}) => {
  return (
    <div className='catagoryBox'>
      {children}
    </div>
  )
}

export default CatagoryBox