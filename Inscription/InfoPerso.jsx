import React, {useState} from "react";
import validation from "./Validation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";



function SignUpInfo({ page, setPage, formData, setFormData }) {
  const [submitting, setSubmitting] = useState(false);

  const formSchema = Yup.object().shape({
    nom : Yup.string().required('Nom requis').min(3),
    prenom : Yup.string().required('Prénom requis').min(3),
    email: Yup.string().email("Format d'email invalide").required('Email requis'),
    password: Yup
      .string()
      .required('Mot de passe requis')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Le mot de passe doit contenir 8 caractèeres : 1 Majuscule, 1 Minuscule, 1 Nombre et 1 Caractère Spécial"
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

  const nom = register('nom')
  const prenom = register('prenom')
  const email = register('email')
  const age = register('age')
  const sexe = register('sexe')
  const password = register('password')
  const confirmPassword = register('confirmPassword')

  const formSubmit =  () => {
       setPage((currPage) => currPage + 1);
       console.log(formData)
  
  };

  const onSubmit = (data) => (
    alert(JSON.stringify(data))
);
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
  );
}

export default SignUpInfo;