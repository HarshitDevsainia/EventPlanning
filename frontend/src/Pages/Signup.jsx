import React, { useState } from 'react';
import {TextInput,Label, Button, Alert, Spinner} from 'flowbite-react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {HiInformationCircle} from 'react-icons/hi'

export default function Signup() {
  const [user,setUser]=useState({});
  const [errorMsg,setErrorMsg]=useState(null);
  const [loader,setLoader]=useState(false);
  const navigate=useNavigate();
  const handleInput=(e)=>{
    setUser({...user,[e.target.id]:e.target.value.trim()});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!user.username || !user.email || !user.password){
      setLoader(false);
      setErrorMsg('Please Fill the All Required Details');
      return;
    }
    setErrorMsg(null);
    try{
        setLoader(true);
        const res=await fetch('/api/auth/signUp',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(user)
        });
        const data=await res.json();
        if(!res.ok){
          setLoader(false);
          setErrorMsg('Username is already exist');
          return;
        }
        setLoader(false);
        navigate('/signin');
    }
    catch(err){
      setLoader(false);
      setErrorMsg(err.message);
      return;
    }
  }
  return (
    <div className="flex flex-col md:flex-row m-2 items-center md:my-10 p-10">
      <div className="w-full h-100  md:w-1/2 p-10">
        <div className="flex flex-col items-center justify-center">
          <h2 className='text-xl text-center font-bold font-serif text-violet-900'>Top Events</h2>
          <p className='text-sm text-center font-semibold'>SignUp to the Top Events</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-3/4">
          <form onSubmit={handleSubmit} className='flex flex-col w-full gap-4'>
            <div className="">
              <div className="">
                <Label htmlFor='username'>Username</Label>
              </div>
              <TextInput id='username' type='text' placeholder='Username' shadow required onChange={handleInput}/>
            </div>
            <div className="">
              <div className="">
                <Label htmlFor='email'>Email</Label>
              </div>
              <TextInput id='email' type='text' placeholder='Email' shadow required onChange={handleInput}/>
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
                'SignUp'
              }
            </Button>
          </form>
          <div className="mt-2">
             <span>Have an Account ? </span>
             <Link to='/signIn' className='text-blue-500 hover:underline'>SignIn</Link>
          </div>
          <div className=" h-20 border-2 border-white">
            {errorMsg!=null && <Alert className='mt-2' color="failure" onDismiss={() => setErrorMsg(null)} icon={HiInformationCircle}>{errorMsg}</Alert>}
          </div>
        </div>
      </div>
    </div>
  )
}
