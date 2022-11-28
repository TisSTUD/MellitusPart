import React from "react";
import validation from './Validation';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextRotateVerticalOutlined } from "@mui/icons-material";




function PersonalInfo({page, setPage, formData, setFormData }) {

  const formSchema = Yup.object().shape({
    hba1c : Yup.string().required('Veuillez sélectionner le type de dernière HbA1c'),
    poids : Yup.number().typeError("Nombre invalide").required('Veuillez saisir votre poids'),
    taille : Yup.number().typeError("Nombre invalide").required('Veuillez saisir votre taille'),
    age : Yup.number().typeError("Nombre invalide").required('Veuillez saisir votre taille'),
    sexe: Yup.string()
    .oneOf(["Homme", "Femme"],"Veuillez sélectionner votre genre" ),

    typeDiab: Yup.string()
     .oneOf(["Type 1", "Type 2", "Gestationnel"],"Veuillez sélectionner le type de votre traîtement" ),
    traitement: Yup.string().required()
     .oneOf(["Insuline", "Médicament"],"Veuillez sélectionner le type de votre traîtement" )
   
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
   
  } = useForm({ mode: "onTouched",
  resolver: yupResolver(formSchema)});

  const typeDiab = register('typeDiab', {required:true})
  const traitement = register('traitement')
  const hba1c = register('hba1c')
  const poids = register('poids')
  const taille = register('taille')
  const sexe = register('sexe')
  const age = register('age')




  const formSubmit =  () => {
       setPage((currPage) => currPage + 1);
       console.log(formData)
  
  };

  return (
    <div className="flex min-h-96  ml-12 flex-col ">
        
            
        <form onSubmit={handleSubmit(formSubmit)}>
              <div>
                <div className="flex flex-row 
                 items-center">
                    <div className=' w-full mb-3'>
                        <label for="Taille" class="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Taille</label>
                        <input type="number"  
                        name='taille'
                          onChange={(e) => {
                            taille.onChange(e); // method from hook form register
                            setFormData({...formData, taille: e.target.value})
                        
                          }}
                          onBlur={taille.onBlur}
                          ref={taille.ref} 
                          className="w-full bg-gray-50 border 
                          border-gray-300 text-gray-900 text-sm 
                          rounded-lg focus:ring-blue-500
                           focus:border-blue-500 block  
                           p-2.5  " placeholder="Taille" />
                           
                    </div> 
                    <div className="mb-3 w-full ml-4">
                        <label for="Poids" class="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Poids</label>
                        <input type="number" 
                          onChange={(e) => {
                            poids.onChange(e); // method from hook form register
                            setFormData({...formData, poids: e.target.value})
                        
                          }}
                          onBlur={poids.onBlur}
                          ref={poids.ref} 
                          name='poids'
                          className="w-full bg-gray-50 border 
                          border-gray-300 text-gray-900 text-sm 
                          rounded-lg focus:ring-blue-500
                           focus:border-blue-500 block  
                           p-2.5  " placeholder="Poids"  />

                    </div> 
                </div> 
    
                <div className='flex flex-row items-center'>
                      <div className="text-8 mb-3 w-full">
                        {errors?.poids?.message} 
                      </div>
                      <div className="text-8 mb-3  w-full ml-6">
                        {errors?.taille?.message}
                      </div>
                </div>
              </div>     
              <div>
                <div className="flex flex-row 
                 items-center">
                    <div className=' w-full mb-3'>
                        <label for="Taille" class="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Sexe</label>
                        <select  
                           onChange={(e) => {
                            sexe.onChange(e); // method from hook form register
                            setFormData({...formData, sexe: e.target.value})
                        
                          }}
                          onBlur={sexe.onBlur}
                          ref={sexe.ref} 
        
                          name="sexe"
                          className=" w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
                           p-2.5 " placeholder="Type de diabète" >
                            <option selected >Sexe</option>
                            <option >Homme</option>
                            <option >Femme</option>
                        </select>
                           
                    </div> 
                    <div className="mb-3 w-full ml-4">
                        <label for="Poids" class="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Age</label>
                        <input type="number" 
                          onChange={(e) => {
                            age.onChange(e); // method from hook form register
                            setFormData({...formData, age: e.target.value})
                        
                          }}
                          onBlur={age.onBlur}
                          ref={age.ref} 
                          name='age'
                          className="w-full bg-gray-50 border 
                          border-gray-300 text-gray-900 text-sm 
                          rounded-lg focus:ring-blue-500
                           focus:border-blue-500 block  
                           p-2.5  " placeholder="Age"  />

                    </div> 
                </div> 
    
                <div className='flex flex-row items-center'>
                      <div className="text-8 mb-3 w-full">
                        {errors?.sexe?.message} 
                      </div>
                      <div className="text-8 mb-3  w-full ml-6">
                        {errors?.age?.message}
                      </div>
                </div>
              </div>     





                    <div className=' mb-3'>
                        <label for="first_name" class="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Type de diabète</label>
                        <select  
                           onChange={(e) => {
                            typeDiab.onChange(e); // method from hook form register
                            setFormData({...formData, typeDiab: e.target.value})
                        
                          }}
                          onBlur={typeDiab.onBlur}
                          ref={typeDiab.ref} 
        
                          name="typeDiab"
                          className=" w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
                           p-2.5 " placeholder="Type de diabète" >
                            <option selected >Type de diabète</option>
                            <option >Type 1</option>
                            <option >Type 2</option>
                            <option >Gestationnel</option>
                        </select>
                        <div className="text-8 mb-3 w-full">
                          {errors?.typeDiab?.message} 
                        </div>
                    </div>
                   
                    <div className=' mb-3'>
                        <label for="Traitement" class="block mb-0.5 text-xs font-medium text-14 dark:text-gray-300">Traîtement</label>
                        <select name="traitement"
                        onChange={(e) => {
                          traitement.onChange(e); // method from hook form register
                          setFormData({...formData, traitement: e.target.value})
          
                        }}
                        onBlur={traitement.onBlur}
                        ref={traitement.ref} 
      
                         className=" w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                          focus:ring-blue-500 focus:border-blue-500 block p-2.5" >
                            <option selected>Traîtement</option>
                            <option >Insuline</option>
                            <option >Médicament</option>
                        </select>
                        <div className="text-8 mb-3 w-full">
                          {errors?.traitement?.message} 
                        </div>
                    </div>
                    <div className=' mb-3'>
                        <label for="HbA1c" 
                        class="block mb-0.5 text-xs font-medium text-14
                         dark:text-gray-300">Dernière HbA1c</label>
                        <input  name="hba1c"
                          onChange={(e) => {
                            hba1c.onChange(e); // method from hook form register
                            setFormData({...formData, hba1c: e.target.value})
            
                          }}
                          onBlur={hba1c.onBlur}
                          ref={hba1c.ref} 
        
                         class="bg-gray-50 border border-gray-300 text-14 text-sm rounded-lg focus:ring-blue-500
                          focus:border-blue-500 block w-full p-2.5 " placeholder="HbA1c"  />
                          <div className="text-8 mb-3 w-full">
                            {errors?.hba1c?.message} 
                          </div>
                    </div> 
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
                 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Suivant</button> 
                    </div>   
          </form>
    </div>
  );
}

export default PersonalInfo;