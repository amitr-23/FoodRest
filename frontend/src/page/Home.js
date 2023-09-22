import React, { useRef} from 'react'
import {useSelector} from "react-redux"
import CardFeature from '../component/CardFeature'
import HomeCard  from '../component/HomeCard'
import {GrNext,GrPrevious} from 'react-icons/gr'
import AllProduct from '../component/AllProduct'


const Home = () => {
  const productData = useSelector((state) =>state.product.productList);
  
  const homeProductCartList = productData.slice(1,5);
  const homeProductCartListVegetables = productData.filter((el) => el.category === "vegetables",[]);
  console.log(homeProductCartListVegetables);

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef()
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200

  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200
    
  };


  return (

    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>

        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>
            <img src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png' className='h-7'/>
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>The fasted Delivery in {" "} <span className='text-red-600'> Your Home</span></h2>
          <p className='py-3 text-base'>Welcome to <span style={{color:"red",fontWeight:"bold"}}>FoodRest</span>, 
                                        your gateway to a world of culinary delights. Explore our bountiful selection of farm-fresh vegetables,
                                         succulent fruits, and gourmet specialties, all delivered straight to your doorstep. 
                                         With a commitment to freshness and convenience, we're here to transform your everyday meals into extraordinary dining experiences. 
                                         Join us and savor the ease and excellence of <span style={{color:"red",fontWeight:"bold"}}>FoodRest</span>– 
                                         where deliciousness meets doorstep delivery.</p>
             <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md'>Order Now</button>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          {
            homeProductCartList[0] ? homeProductCartList.map((el) => {
              return(
                <HomeCard 
                key={el._id}
                id={el._id}
                 image={el.image}
                 name={el.name}
                 price={el.price}
                 category={el.category}
                
                />
              );
            })
            :
            loadingArray.map((el,index)=> {
              return(
                <HomeCard 
                key={index}
                loading={"Loading..."}
                />
              )
            })
          }
        </div>
      </div>

      <div className=''>
        <div className='flex w-full items-center'>
        <h2 className='font-bold text-2xl-text-slate-800 mb-4'>Fresh Vegetables</h2>
        <div className='ml-auto flex gap-4'>
          <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious/></button>
          <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext/></button>
        </div>
        </div>
        <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
          {
            homeProductCartListVegetables[0] ? ( homeProductCartListVegetables.map((el) => {
              return(
                <CardFeature 
                key={el._id+"vegetables"}
                id={el._id}
                name={el.name}
                category={el.category}
                price={el.price}
                image={el.image}
                />
               
              )
            })

         ) :(
            loadingArrayFeature.map((el,index) => 
            <CardFeature loading="Loading...." key={index+"cartLoading"} />

          ))}
          
        </div>
      </div>
      <AllProduct heading={" Your Product"}  />

    </div>
  )
}

export default Home
