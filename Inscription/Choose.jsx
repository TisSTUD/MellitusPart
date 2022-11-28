import React from 'react'
import patientSignup from '../../assets/patientSignup.jpg'
import doctorSG from '../../assets/doctorSG.png'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Header';


function Choose() {
  const navigate = useNavigate()

  return (
    <div className='w-full bg-0'>
      <div> <Header/> </div>
      <div><p className='text-xl font-medium text-center m-6 p-6' >Choose your Sign Up profile</p></div>
        <div className='flex flex-row mt-16  justify-center items-center self-center '>
          
            <div onClick={()=> {navigate('/Signup')}} className='border w-52 h-52 mr-8 rounded-full flex flex-col p-4 items-center cursor-pointer'> 
               <img className='h-32 w-32 fit-contain rounded-full  ' src={patientSignup}  />
                
                <div className='font-medium' > <p>Je suis un patient</p> </div>
            </div>
            <div onClick={()=> {navigate('/Register')}} className='border w-52 h-52 mr-8 rounded-full flex flex-col p-4 items-center cursor-pointer'>
                <img className='h-32 w-32 fit-contain rounded-full  ' src={doctorSG}  />
                <div className='font-medium' > <p>Je suis médecin</p> </div>

            </div>
        </div>
    </div>
  )
}

export default Choose