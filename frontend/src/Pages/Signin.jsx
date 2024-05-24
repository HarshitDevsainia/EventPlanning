import React, { useState } from 'react';
import {TextInput,Label, Button, Alert, Spinner} from 'flowbite-react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {HiInformationCircle} from 'react-icons/hi'
import {useDispatch, useSelector} from 'react-redux'
import {signInFailure,signInSuccess,signInStart} from '../redux/user/userSlice'

export default function Signin() {
  const [user,setUser]=useState({});
  let {loading:loader,error:errorMsg}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleInput=(e)=>{
    setUser({...user,[e.target.id]:e.target.value.trim()});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(user);
    if(!user.email || !user.password){
      dispatch(signInFailure('All fiels are Required'));
      return;
    }
    try{
      dispatch(signInStart());
        const res=await fetch('/api/auth/signIn',{
          method:'POST',
          headers:{'Content-Type':'Application/json'},
          body:JSON.stringify(user)
        });
        const data=await res.json();
        if(!res.ok){
          dispatch(signInFailure(data.message));
          return;
        }
        dispatch(signInSuccess(data));
        navigate('/');
    }
    catch(err){
      dispatch(signInFailure(err.message));
    }
  }
  return (
    <div className="flex flex-col md:flex-row m-2 items-center md:my-10 p-10">
    <div className="w-full h-100  md:w-1/2 p-10">
      <div className="flex flex-col items-center justify-center">
        <h2 className='text-xl text-center font-bold font-serif text-violet-900'>Top Events</h2>
        <p className='text-sm text-center font-semibold'>SignIn to the Top Events</p>
      </div>
    </div>
    <div className="w-full md:w-1/2 flex items-center justify-center">
      <div className="w-3/4">
        <form onSubmit={handleSubmit} className='flex flex-col w-full gap-4'>
          <div className="">
            <div className="">
              <Label htmlFor='email'>Email</Label>
            </div>
            <TextInput id='email' type='email' placeholder='Email' shadow required onChange={handleInput}/>
          </div>
          <div className="">
            <div className="">
              <Label htmlFor='password'>Password</Label>
            </div>
            <TextInput id='password' type='password' placeholder='Password' shadow required onChange={handleInput}/>
          </div>
          <Button type='submit' className=' !bg-violet-900'>
            {loader ? 
              <div className="">
                <Spinner size={'sm'}/>
                <span className='ml-2'>Loading...</span>
              </div>
              :
              'SignIn'
            }
          </Button>
        </form>
        <div className="mt-2">
           <span>Not Have an Account ? </span>
           <Link to='/signUp' className='text-blue-500 hover:underline'>SignUp</Link>
        </div>
        <div className=" h-20 border-2 border-white">
          {errorMsg!=null && <Alert className='mt-2' color="failure" onDismiss={() => setErrorMsg(null)} icon={HiInformationCircle}>{errorMsg}</Alert>}
        </div>
      </div>
    </div>
  </div>
  )
}
