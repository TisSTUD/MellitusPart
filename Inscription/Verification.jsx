import React from 'react'

function Verification() {
  return (
    // <div>
    //    <p>
    //     L'administrateur doit d'abord vérifier votre compte.
    //     <br />
    //     Cette procédure peut durer jusqu'à 48 heures. Merci de patienter.
    //    </p>
       
    // </div>
    <div className='w-full h-screen flex justify-center'>
      <div class="p-1 shadow-xl bg-gradient-to-r self-center flex justify-center from-6 via-purple-500 to-8 rounded-2xl">
        <div class="block p-6 bg-white sm:p-8 rounded-xl" >
            <div class="mt-4 sm:pr-8">
                <p class="text-xl font-semibold text-gray-900">
                  L'administrateur doit d'abord vérifier votre compte.
                  <br />
                  Cette procédure peut durer jusqu'à 48 heures. Merci de patienter.
                </p>
               
               
              <div className='flex justify-end mt-10'>
              

               
                </div>

    
            </div>
        </div>
    </div>
</div>
  )
}

export default Verification