import React, {useState, useEffect} from "react";
import { Icon } from '@iconify/react';
import validation from "./Validation";
import {collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../../firebase";




function SignUpInfo({ page, setPage, formData, setFormData }) {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
 


  return (

    
    <div className="flex min-h-96  ml-12 flex-col ">
        

                  <div className="mb-6 flex flex-row items-center text-301 text-xs "> <Icon className="mr-1" icon="charm:info" color="#808191" width="20" height="20" /> Remplissez ce champs si votre médecin traîtant vous a donné un code pour le contacter</div>

                  <div className="mb-3 ">

                        <label htmlFor="doc" className="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Code médecin</label>
                        <input type="text" 
                        value={formData.code}  
                        onChange={(e)=>{
                          setFormData({...formData, code: e.target.value}); setErrors({})  }}
                        disabled={submitting}
                        className="w-full bg-gray-50 border 
                         border-gray-300 text-gray-900 text-sm 
                         rounded-lg focus:ring-blue-500
                          focus:border-blue-500 block  
                          p-2.5  " placeholder="Nom" />
                          {/* { validation(formData).code &&  <p className="text-8">{validation(formData).code}</p> } */}

                  </div>
                  
                
          
                <div className="flex flex-row justify-between ">
                <button 
                  disabled={page == 0}
                  onClick={() => {
                    setPage((currPage) => currPage - 1);
                  }}
                  className="text-white bg-6 hover:bg-blue-800 focus:ring-4
                 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Retour
                </button>
                <button
                  onClick={() => {setPage((currPage) => currPage + 1);}}
                  className="text-white bg-6 hover:bg-blue-800 focus:ring-4
                 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >Suivant
                </button> 
                </div>
                  
          
    </div>
  );
}

export default SignUpInfo;