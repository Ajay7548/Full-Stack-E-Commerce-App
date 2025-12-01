import React, { useEffect, useState } from 'react'
import { useShop } from '../context/ShopContext'
import Title from './Title'
import ProductItems from './ProductItems'

const RelatedProduct = ({category,subCategory}) => {
    const {products} = useShop()
    const [relatedProduct,setRelatedProduct] = useState([])

    

    useEffect(()=>{



        if(products.length > 0){
            let productData = [...products]

            productData = productData.filter(item => category === item.category)
            productData = productData.filter(item => subCategory === item.subCategory)

            setRelatedProduct(productData.slice(0,5))
            // console.log((productData.slice(0,3)));
        }
    },[products,category,subCategory])

  return (
    <div className='my-3'>
        <div className='flex flex-col justify-center items-center-10 pt-8'>
        <div className='text-3xl text-center py-6'>
            <Title text1={'RELATED'} text2={'PRODUCTS'} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {relatedProduct.map((item) => {
            return (
              <ProductItems
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                // onClick={handleClick}
              />
            );
          })}
        </div>
        </div>
    </div>
  )
}

export default RelatedProduct