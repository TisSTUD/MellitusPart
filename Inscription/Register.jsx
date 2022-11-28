import React, { useState, useRef} from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from "../../firebase";
import { Timestamp, doc, setDoc} from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import loginpic from '../../assets/loginpic.jpg'
import validation from "./Validation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";



function Register({page, setPage, formData, setFormData}) {
  

    const navigate = useNavigate();
    // const [formValues, setFormValues] = useState({
    //     nom:'',
    //     prenom: '',
    //     email: '',
    //     password : '',
    //     confirmPassword:'',
    // });
   
    
    const formSchema = Yup.object().shape({
      nom : Yup.string().required('Nom requis').min(3),

      prenom : Yup.string().required('Prénom requis').min(3),

      email: Yup.string().email("Format d'email invalide").required('Email requis'),

      password: Yup
        .string()
        .required('Mot de passe requis')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Le mot de passe doit contenir 8 caractèeres : 1 majuscule, 1 Minuscule, 1 Nombre et 1 caractère Spécial"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Les mots de passe sont incompatibles'),
     
    });
  
  
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({ mode: "onTouched",
    resolver: yupResolver(formSchema)});

  

    function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  }
  
  const formSubmit =  () => {
    setPage((currPage) => currPage + 1);
    console.log(formData)

};
    // const formSubmit = async () => {
    //   const {nom,prenom, email, password} = formValues  
    //   try {
    //           const result = await createUserWithEmailAndPassword(
    //             auth,
    //             email,
    //             password,
    //         ); 
    //         await setDoc(doc(db, 'users', result.user.uid), {
    //             uid          :result.user.uid,
    //             nom,
    //             prenom,
    //             email,
    //             password,
    //             code : makeid(5),
    //             photoURL     : 'https://st2.depositphotos.com/4060975/9157/v/600/depositphotos_91577612-stock-illustration-doctor-colored-vector-icon.jpg',
    //             createdAt    :Timestamp.fromDate(new Date()),
    //             type         : 'doctor'
    //         })

    //       //   await setDoc(doc(db, 'doctors', result.user.uid), {
    //       //     uid          :result.user.uid,
    //       //     type         : 'doctor'
    //       // })
    //         .then(res=>{
    //             console.log(res)
    //           })                    
    //         } catch (error) {
    //           console.log(error)
    //           return
    //         }
    //    navigate('/Doctor/Code')
    
    // };
    const nom = register('nom')
    const prenom = register('prenom')
    
    const email = register('email')
    const password = register('password')
    const confirmPassword = register('confirmPassword')

 
  return (
    <div className="flex min-h-96  mx-6 flex-col ">
    <form onSubmit={handleSubmit(formSubmit)}>
      <div>
            <div className='flex flex-row items-center'>
                <div className="mb-3 w-full ">

                      <label htmlFor="nom" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Nom</label>
                      <input type="Nom" name="nom"
                      
                      className="w-full bg-gray-50 border 
                       border-gray-300 text-gray-900 text-sm 
                       rounded-lg focus:ring-blue-500
                        focus:border-blue-500 block  
                        p-2.5  " placeholder="John" 
                        onChange={(e) => {
                          nom.onChange(e); // method from hook form register
                          setFormData({...formData, nom: e.target.value})
          
                        }}
                        onBlur={nom.onBlur}
                        ref={nom.ref} 
      
                        />
                       
                </div>

                <div className="mb-3 w-full ml-4">
                      <label htmlFor="prenom" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Prénom</label>
                      <input type="Prénom" name="prenom"  
                      onChange={(e) => {
                        prenom.onChange(e); // method from hook form register
                        setFormData({...formData, prenom: e.target.value})
        
                      }}
                      onBlur={prenom.onBlur}
                      ref={prenom.ref} 
                  className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " placeholder="Prénom" />
                  
                </div>
              </div>

              <div className='flex flex-row items-center'>
                <div className="text-8 mb-3 w-full">
                  {errors?.nom?.message} 
                </div>
                <div className="text-8 mb-3  w-full ml-6">
                  {errors?.prenom?.message}
                </div>
              </div>
      </div>
       
      <div className="mb-3">
                <label htmlFor="email" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Email</label>
                <input type="email" name="email" 
               onChange={(e) => {
                email.onChange(e); // method from hook form register
                setFormData({...formData, email: e.target.value})

              }}
              onBlur={email.onBlur}
              ref={email.ref} 
                className=" w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
                 p-2.5" placeholder="NomPrenom@exemple.com"title="Format d'Email invalide"   />
                  <div className="text-8">
                     {errors?.email?.message}
                  </div>
      </div>

      <div className="mb-3">
                <label htmlFor="password" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Mot de passe </label>
                <input type="password" name="password" 
                onChange={(e) => {
                  password.onChange(e); // method from hook form register
                  setFormData({...formData, password: e.target.value})
  
                }}
                onBlur={password.onBlur}
                ref={password.ref} 
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
                 p-2.5 " placeholder="Mot de passe"  />
                  <div className="text-8">
                     {errors?.password?.message}
                  </div>
                
      </div>
         
      <div className="mb-3">
                  <label htmlFor="password" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Confirmation mot de passe</label>
                  <input type="password" name="confirmPassword" 
                 onChange={(e) => {
                  confirmPassword.onChange(e); // method from hook form register
                  setFormData({...formData, confirmPassword: e.target.value})
  
                }}
                onBlur={confirmPassword.onBlur}
                ref={confirmPassword.ref} 
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
                   p-2.5 " placeholder="Confirmer votre mot de passe"/>
                    <div className="text-8">
                     {errors?.confirmPassword?.message}
                  </div>
      </div>
                
      <div className="flex flex-row justify-end ">
        <button type="submit" className="text-white bg-6 hover:bg-blue-800 focus:ring-4
         focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"> Suivant</button> 
      </div>
                
    </form>
  </div>
       
      // <div class=" block h-screen w-full sm:flex sm:flex-col ">
  
      //   <div className="flex flex-col p-4 w-full md:w-1/2">
      //   {/* <div className="mb-8">
      //       <h1 class="text-8 font-bold text-center text-4xl font-sans">Mellitus</h1>
            
      //     <h1 class="text-9  font-semibold text-2xl mt-7 mb-3">Bienvenue Doc' !</h1>
            
      //   </div> */}
      //   <div className="w-full items-center rounded-2xl   " >

      //     <div className=" flex-col items-center flex  p-2 ">
      //       <form onSubmit={handleSubmit(formSubmit)} className='w-3/4'>
      //       <div className='flex flex-row items-center'>
      //         <div className="mb-3 w-full">
      //               <label htmlFor="name" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Nom</label>
      //           <input 
      //                 className="
      //                 text-sm
      //                 placeholder-gray-500
      //                 pl-4
      //                 pr-4
      //                 rounded-2xl
      //                 border border-gray-400
      //                 w-full
      //                 py-2
      //                 focus:outline-none focus:border-blue-400
      //                 "  type="text" name='nom'
      //             placeholder="Doe" 
      //             onChange={(e) => {
      //               nom.onChange(e); // method from hook form register
      //               setFormData({...formData, nom: e.target.value})
    
      //             }}
      //             onBlur={nom.onBlur}
      //             ref={nom.ref} 

      //           />
      //            <div className="text-8">
      //               {errors?.nom?.message}
      //             </div>
      //         </div>
             
      //          <div className="mb-3 w-full ml-4">
      //               <label htmlFor="prenom" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Prénom</label>
      //           <input 
      //                 className="
      //                 text-sm
      //                 placeholder-gray-500
      //                 pl-4
      //                 pr-4
      //                 rounded-2xl
      //                 border border-gray-400
      //                 w-full
      //                 py-2
      //                 focus:outline-none focus:border-blue-400
      //                 "  type="text"
      //                 name='prenom'
      //             placeholder="John" 
      //             onChange={(e) => {
      //               prenom.onChange(e); // method from hook form register
      //               setFormData({...formData, prenom: e.target.value})
    
      //             }}
      //             onBlur={prenom.onBlur}
      //             ref={prenom.ref} 

      //           />
      //         <div className="text-8">
      //               {errors?.prenom?.message}
      //             </div>
      //         </div>
      //       </div>
      //       <div className="mb-3">
      //               <label htmlFor="email" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Email</label>
      //               <input     className="
      //                 text-sm
      //                 placeholder-gray-500
      //                 pl-4
      //                 pr-4
      //                 rounded-2xl
      //                 border border-gray-400
      //                 w-full
      //                 py-2
      //                 focus:outline-none focus:border-blue-400
      //                 "  type="email" name="email"  placeholder="JohnDoe@exemple.com" 
      //               // ref={psdRef} 
      //               onChange={(e) => {
      //                 password.onChange(e); // method from hook form register
      //                 setFormData({...formData, email: e.target.value})
      
      //               }}
      //               onBlur={email.onBlur}
      //               ref={email.ref} 

      //             />
      //         <p className="text-8">{errors.email?.message}</p>


      //       </div>
      //       <div className="mb-3">
      //           <label htmlFor="Mot de passe" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Mot de passe </label>
      //           <input     className="
      //                 text-sm
      //                 placeholder-gray-500
      //                 pl-4
      //                 pr-4
      //                 rounded-2xl
      //                 border border-gray-400
      //                 w-full
      //                 py-2
      //                 focus:outline-none focus:border-blue-400
      //                 "  type="password" name="password"  placeholder="********" 
      //               // ref={psdRef} 
      //               onChange={(e) => {
      //                 password.onChange(e); // method from hook form register
      //                 setFormData({...formData, password: e.target.value})
    
      //               }}
      //               onBlur={password.onBlur}
      //               ref={password.ref} 

      //             />
      //         <p className="text-8">{errors.password?.message}</p>
      //       </div>
      //       <div className="mb-3">
      //           <label htmlFor="Mot de passe" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Confirmer mot de passe </label>
      //           <input     className="
      //                 text-sm
      //                 placeholder-gray-500
      //                 pl-4
      //                 pr-4
      //                 rounded-2xl
      //                 border border-gray-400
      //                 w-full
      //                 py-2
      //                 focus:outline-none focus:border-blue-400
      //                 "  type="password" name="confirmPassword" placeholder=" ******** " 
      //                 onChange={(e) => {
      //                   confirmPassword.onChange(e); // method from hook form register
      //                   setFormData({...formData, confirmPassword: e.target.value})
        
      //                 }}
      //                 onBlur={confirmPassword.onBlur}
      //                 ref={confirmPassword.ref} 

      //             />
      //         <p className="text-8">{errors.confirmPassword?.message}</p>


      //       </div>
      //       <div className="flex flex-row justify-end ">
      //        <button type="submit" className="text-white bg-6 hover:bg-blue-800 focus:ring-4
      //        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"> Suivant</button> 
      //       </div>
       
      //         {/* <button  type="submit"
              
      //           className=" flex flex-row justify-end  py-2 right-0 px-3 text-xs font-medium text-center text-white
      //           bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
      //             S'inscrire</button> */}
      //         </form>
      //     </div>
      //   </div>
      //   </div>
      // </div>
   
  )
}

export default Register