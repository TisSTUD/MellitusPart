
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import React, { useState, useEffect} from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from "../../firebase";
import { Timestamp, doc, setDoc} from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';
function DocInfo({ page, setPage, formData, setFormData }) {
  const [submitting, setSubmitting] = useState(false);
  const [userAdmin, setUserAdmin] = useState([]);
  const navigate = useNavigate();
  const {user} = UserAuth()
  const formSchema = Yup.object().shape({
    specialite : Yup.string().required('Spécialité requise'),
    numOrdre : Yup.number().typeError("Numéro invalide").required("Numéro d'ordre requis"),
    endroit: Yup.string().required('Endroit requis'),
  
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched",
  resolver: yupResolver(formSchema)});

  const specialite = register('specialite')
  const numOrdre = register('numOrdre')
  const endroit = register('endroit')

  // const formSubmit =  () => {
  //      setPage((currPage) => currPage + 1);
  //      console.log(formData)
  
  // };
  
  const q = query(collection(db,'users'), where('type', '==', 'admin'));
  useEffect(() => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
              setUserAdmin(doc.data());
          });
      });
  }, []);

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

    const formSubmit = async () => {
      const {nom,prenom, email, password, specialite, numOrdre, endroit} = formData
      try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            ); 
            await setDoc(doc(db, 'users', result.user.uid), {
                uid          :result.user.uid,
                nom,
                prenom,
                email,
                password,
                specialite,
                endroit,
                numOrdre,
                code : makeid(5),
                photoURL     : 'https://st2.depositphotos.com/4060975/9157/v/600/depositphotos_91577612-stock-illustration-doctor-colored-vector-icon.jpg',
                createdAt    :Timestamp.fromDate(new Date()),
                type         : 'doctor',
                isVerified   : 'false', 
                new: true,
            })

            .then(res=>{
                console.log(res)
              })                    
            } catch (error) {
              console.log(error)
              return
            }
       navigate('/Verification')
     
    };
    console.log(formData)

  return (

    
    <div className="flex min-h-96  mx-6 flex-col ">
      <form onSubmit={handleSubmit(formSubmit)}>

        <div className="mb-3">
          <label htmlFor="Specialite" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Specialité</label>
          <input type="text" name="specialite"
            className="w-full bg-gray-50 border 
            border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500
           focus:border-blue-500 block  
            p-2.5  " 
            placeholder="Diabétologie..." 
            onChange={(e) => {
              specialite.onChange(e); // method from hook form register
              setFormData({...formData, specialite: e.target.value})
            }}
            onBlur={specialite.onBlur} 
            ref={specialite.ref} 
        
          />
          <div className="text-8 mb-3 w-full">
           {errors?.specialite?.message} 
          </div>       
        </div>
        

        <div className="mb-3">
          <label htmlFor="numOrdre" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Numéro d'ordre</label>
          <input type="number" name="numOrdre"  
            onChange={(e) => {
              numOrdre.onChange(e); // method from hook form register
              setFormData({...formData, numOrdre: e.target.value})
            }}
            onBlur={numOrdre.onBlur}
            ref={numOrdre.ref} 
            className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-l
          focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " placeholder="12345" 
          />
          <div className="text-8 mb-3  w-full ml-6">
           {errors?.numOrdre?.message}
          </div>
        </div>
        

           
        <div className="mb-3">
          <label htmlFor="endroit" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Ville d'exercice</label>
          <input type="text" name="endroit" 
            onChange={(e) => {
              endroit.onChange(e); // method from hook form register
              setFormData({...formData, endroit: e.target.value})
            }}
            onBlur={endroit.onBlur}
            ref={endroit.ref} 
              className=" w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
             p-2.5" placeholder="Tizi-Ouzou..." title="Format d'endroit invalide"   
          />
          <div className="text-8">
            {errors?.endroit?.message}
          </div>
        </div>

        {/* <div className="mb-3">
          <label htmlFor="password" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Mot de passe </label>
          <input type="password" name="password" 
            onChange={(e) => {
             password.onChange(e); // method from hook form register
              setFormData({...formData, password: e.target.value}) 
            }}
            onBlur={password.onBlur}
            ref={password.ref} 
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
            p-2.5 " placeholder="Mot de passe"  
          />
          <div className="text-8">
            {errors?.password?.message}
          </div>    
        </div>  */}
           
                  
        <div className="flex flex-row justify-between ">
          <button
            className="text-white bg-6 hover:bg-blue-800 focus:ring-4
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Retour
          </button>
          <button type="submit" className="text-white bg-6 hover:bg-blue-800 focus:ring-4
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">S'inscrire</button>  
        </div> 
      </form>
    </div>
  );
}

export default DocInfo;