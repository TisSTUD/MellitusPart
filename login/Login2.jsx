import React, { useState, useEffect, useRef} from "react";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { UserAuth } from "../context/AuthContext";
import { auth, db} from "../firebase";
import { useNavigate } from "react-router-dom";
import loginpic from '../assets/conx.png'
import { getDoc,doc } from 'firebase/firestore';


function Login2() {
    const history = useNavigate();
    const [formValues, setFormValues] = useState({
      email: '',
      password : ''
    });
    const [errorsEmail, setErrorsEmail] = useState('')
    const [errorsCompte, setErrorsCompte] = useState('')

    const [errorsPassword, setErrorsPassword] = useState('')
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const psdRef = useRef();
    const emailRef = useRef();
    const { user, forgotPassword } = UserAuth();



    const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      
      if (!values.email){
        setErrorsEmail('Email requis')
      }else if (!/\S+@\S+\.\S+/.test(values.email)){
        setErrorsEmail('Email incorrect')
      }


      if (!values.password){
        setErrorsPassword('Mot de passe requis')
      }else if (values.password.length < 6){
          errors.password="password must be more than 8 caracters.";
      }
      return errors;
    };
   
    const forgotPasswordHandler = () => {
      
      const email = emailRef.current.value;
      if (email)
        forgotPassword(email).then(() => {
          alert(`Un lien de réinitialisation vous a été envoyé sur votre adresse E-mail : ${email }`)
        });
    };


    const login = async (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);

      const {email, password} = formValues
  
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          email,
          password
        ).then( async (userCredentials) => {
          const userId = userCredentials._tokenResponse.localId;

          const info = await getDoc(doc(db,'users',userId));
          console.log(info.data())
          if (info.data()=== undefined){

            setErrorsCompte("Votre compte a été supprimé par l'administrateur. Contactez admin@mellitus.com pour plus d'informations.")
          }

          if(info.data().type === 'patient') {
            history('/Dashboard/')
          } else if(info.data().type === 'doctor' && info.data().isVerified ==='true') {
            history('/Doctor')
          } else if( info.data().isVerified ==='false') {
            history('/Verification')
          } 
          else if (info.data().type === 'admin'){
            history('/Admin')
          } 
        }

        )
        setFormErrors('');
        console.log(user);
      } catch(err) {
         if (err.code === 'auth/user-not-found'){
          setErrorsEmail("Email introuvable")
         }
         

         if (err.code === 'auth/wrong-password'){
          setErrorsPassword("Mot de passe incorrect")
         }
         console.dir(err)
      }
    };
  return (
    
       
      <div class="h-screen block w-full sm:flex  ">
  
        <div className="flex flex-col p-4 w-full md:w-1/2">
        <div className="mb-4">
            <h1 class="text-8 font-bold text-center text-4xl font-sans">Mellitus</h1>
            

        </div>
        <div className=" p-2" >

          <h1 class="text-9  font-semibold text-2xl mb-3">Heureux de vous revoir !</h1>
          <div className="w-full rounded-2xl p-6 md:p-16  "
          >
              
              <div className="mb-3">
                    <label htmlFor="email" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Email</label>
                <input 
                      className="
                      text-sm
                      placeholder-gray-500
                      pl-4
                      pr-4
                      rounded-2xl
                      border border-gray-400
                      w-full
                      py-2
                      focus:outline-none focus:border-blue-400
                      "  type="text"
                  placeholder="Email Address" 
                  ref={emailRef}
                  value={formValues.email}
                  onChange={(e)=>setFormValues({...formValues, email: e.target.value})}

                />
              </div>
              <p className="text-8">{errorsEmail}</p>

              <div className="mb-3">
                <label htmlFor="Mot de passe" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Mot de passe </label>
                <input     className="
                      text-sm
                      placeholder-gray-500
                      pl-4
                      pr-4
                      rounded-2xl
                      border border-gray-400
                      w-full
                      py-2
                      focus:outline-none focus:border-blue-400
                      "  type="password" name="" id="" placeholder="Password" 
                    ref={psdRef} 
                    value={formValues.password}
                    onChange={(e)=>setFormValues({...formValues, password: e.target.value})}

                  />
              </div>
              <p className="text-8">{errorsPassword}</p>
              <p className="text-8">{errorsCompte}</p>


              <div className="flex flex-row justify-between  mt-8">
              <span onClick={forgotPasswordHandler} class="text-sm ml-2 underline hover:text-blue-500 cursor-pointer">Mot de passe oublié ?</span>

                <button onClick={login} 
                  className=" flex flex-row justify-end  py-2 right-0 px-4 text-md font-medium text-center text-white
                  bg-6 rounded-2xl hover:bg-10 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  Connexion
                
                </button>
              </div>
              

              <div className="flex justify-center items-center cursor-pointer mt-6">
            <a  onClick={()=> {history('/Choose')}}  
            className="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
            ">
            <span className="ml-2">Pas encore membre?
            </span><a  className="text-xs ml-2 text-blue-500 font-semibold">S'inscrire</a></a>
        </div>
          </div>

          
        </div>
        
        </div>

        <div class="flex items-center self-center h-screen bg-4 w-1/2  ">
          <img  className='h-2/3 ml-8 object-fit' src={loginpic} alt="" />
        </div>
        {/* <div class="flex w-1/2  ">
          <img  className='w-full object-fit' src={loginpic} alt="" />
        </div> */}

      </div>
    
  )
}

export default Login2

