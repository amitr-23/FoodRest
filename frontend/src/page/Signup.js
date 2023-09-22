import React, { useState } from 'react'
import loginSignupImage from '../assest/login-animation.gif'
import {BiShow, BiHide} from 'react-icons/bi'
import { Link,useNavigate } from 'react-router-dom';
import {ImagetoBase64} from '../utility/ImagetoBase64'
import {toast} from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate()
    const[showPassword,setShowPassword] = useState(false);
    const[showConfirmPassword,setShowConfirmPassword] = useState(false);
    const[data,setData] = useState({
        firstname : "",
        lastname : "",
        email : "",
        password : "",
        confirmPassword : "",
        image : "",

    });
    console.log(data);
    const handleShowPassword = ()=> {
        setShowPassword(preve => !preve)
    }

    const handleShowConfirmPassword = ()=> {
        setShowConfirmPassword(preve => !preve)
    }

    const handleOnChange = (e) =>{
        const{name,value} = e.target
        setData((preve) => {
            return{
                ...preve,
                [name] : value,
            };
        });

    };

    const handleUploadProfileImage = async(e) => {
       
        const data = await ImagetoBase64(e.target.files[0])
        console.log(data)

        setData((preve) => {
            return{
                ...preve,
                image : data
            }
        })

    } 

   console.log(process.env.REACT_APP_SERVER_DOMIN)

    const handleSubmit = async(e) => {
       e.preventDefault();
       const {firstname,email,password,confirmPassword} = data;
       if(firstname && email && password && confirmPassword){
        if(password === confirmPassword){
            console.log(data);
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,
            {
                method : "POST",
                headers : {
                    "content-type" : "application/json"

                },
                body : JSON.stringify(data)
            });
            const dataRes = await fetchData.json()
            console.log(dataRes)

            //alert(dataRes.message);
            toast(dataRes.message)
            if(dataRes.alert){
                navigate("/login");
            }
            
           
        }
        else{
            alert("password and confirmpassword not equal");
        }
       }
       else{
        alert("please enter required fields");
       }
    }
  return (
    <div className='p-3 md:p-4'>
        <div className='w-full max-w-sm bg-white m-auto flex  flex-col p-4'>
            
            <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                <img src={data.image ? data.image : loginSignupImage}  className="w-full h-full"/>

                <label htmlFor='profileImage'>
                <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>
                    <p className='text-sm p-1 text-white'>Upload</p>
                </div>
                <input type={"file"} id="profileImage"  accept='image/*'className='hidden' onChange={handleUploadProfileImage}/>
                </label>
            </div>
        
     <form className='w-full py-3 flex flex-col'onSubmit={handleSubmit}>
        <label htmlFor='firstname'>First Name</label>
        <input type={"text"} id="firstname" name='firstname' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'value={data.firstname} onChange={handleOnChange}/>
        
        <label htmlFor='lastname'>Last Name</label>
        <input type={"text"} id="lastname" name='lastname' className='mt-1  mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.lastname} onChange={handleOnChange}/>

        <label htmlFor='email'>Email</label>
        <input type={"text"} id="email" name='email' className='mt-1  mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange}/>

        <label htmlFor='password'>Password</label>
        <div className='flex bg-slate-200 rounded mt-1  mb-2 px-2 py-1 focus-within:outline focus-within:outline-blue-300' value={data.password} onChange={handleOnChange}>
        <input type={showPassword ? "text":"password"} id="password" name='password' className=' w-full bg-slate-200 border-none outline-none'/>
        <span className='flex text-xl cursor-pointer'onClick={handleShowPassword} >{showPassword ?<BiShow />: <BiHide/>}</span>
        </div>

        <label htmlFor='confirmpassword'>Confirm Password</label>
        <div className='flex bg-slate-200 rounded mt-1  mb-2 px-2 py-1 focus-within:outline focus-within:outline-blue-300' value={data.confirmPassword} onChange={handleOnChange} >
        <input type={showConfirmPassword ? "text":"password"} id="confirmpassword" name='confirmPassword' className=' w-full bg-slate-200 border-none outline-none'/>
        <span className='flex text-xl cursor-pointer'onClick={handleShowConfirmPassword} >{showConfirmPassword ?<BiShow />: <BiHide/>}</span>
        </div>
        <button className='w-full m-auto  max-w-[150px]  bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Sign up</button>
     </form>
     <p className='text-left text-sm mt-2'>Already have account ? <Link to={"/login"} className="text-red-500 underline">Login</Link></p>

    </div>
    </div>
  )
}

export default Signup
