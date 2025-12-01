import React from 'react'
import Subscribe from '../components/Subscribe'
import Title from '../components/Title'
import contact_img from '../assets/contact_img.png'

const Contact = () => {
  return (
    <div className='md:px-[6%] pt-20'>

        <div className='text-2xl text-center mt-10'>
          <Title text1={'CONTACT'} text2={'US'}/>
        </div>

      <div className='mt-6 grid md:grid-cols-2 gap-10 py-10  '>
        <div>
          <img src={contact_img} alt="" />
        </div>

        <div className=''>
          <div className='flex flex-col '>
            <p className='py-8 text-xl font-semibold dark:text-white text-gray-600'>Our Store</p>
            <span className='text-gray-500 dark:text-gray-200'>400703  Vashi  Station</span>
            <span className='text-gray-500 dark:text-gray-200 pb-8'>Vashi, Navi Mumbai  Maharashtra</span>
            <span className='text-gray-500 dark:text-gray-200'>Tel: (91) 7666222275</span>
            <span className='text-gray-500 dark:text-gray-200'>Email: mouryaajay7548@gmail.com</span>
          </div>

          <div>
            <p className='py-8 text-xl font-semibold dark:text-white text-gray-600'>Careers at Forever</p>
            <p className='text-gray-500 dark:text-gray-200 pb-5'>Learn more about our teams and job openings.</p>
            <button className='border px-6 py-3 hover:text-white hover:bg-black cursor-pointer transition ease-in-out'>Explore Jobs</button>
          </div>
        </div>

      

      </div>
      <Subscribe/>
    </div>
  )
}

export default Contact