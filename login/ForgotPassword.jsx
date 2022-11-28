import React, { useState, useEffect, useRef} from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from "../firebase";
import {confirmPasswordReset} from 'firebase/auth'

function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

function ForgotPassword() {
    const [password, setPassword] = useState('')
    const Navigate = useNavigate();
    const query = useQuery()

    const onSubmit = async (e) => {
        e.preventDefault()
            try {
              await resetPassword(query.get('oobCode'), password)
              Navigate('/Login')
            } catch (error) {
                console.log(error.message)
            }
    }
    console.log(query.get('mode'), query.get('oobCode'))
  return (
    <div>

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="
            flex flex-col
            bg-white
            shadow-md
            px-4
            sm:px-6
            md:px-8
            lg:px-10
            py-8
            rounded-3xl
            w-50
            max-w-md
        ">
            <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Mot de passe oublié ?
            </div>
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
            Entrez un nouveau mot de passe 
            </div>
            <div className="mt-10">
            <form onSubmit={onSubmit}>
                {/* <div className="flex flex-col mb-5">
                    <label htmlFor="email" className="mb-1 text-xs tracking-wide text-gray-600">Name:</label>
                    <div className="relative">
                        <div className="
                        inline-flex
                        items-center
                        justify-center
                        absolute
                        left-0
                        top-0
                        h-full
                        w-10
                        text-gray-400
                        ">
                        <i className="fas fa-user text-blue-500" />
                        </div>
                        <input id="email" type="email" name="email" className="
                        text-sm
                        placeholder-gray-500
                        pl-10
                        pr-4
                        rounded-2xl
                        border border-gray-400
                        w-full
                        py-2
                        focus:outline-none focus:border-blue-400
                        " placeholder="Enter your name" />
                    </div>
                </div>

                <div className="flex flex-col mb-5">
                    <label htmlFor="email" className="mb-1 text-xs tracking-wide text-gray-600">E-Mail Address:</label>
                    <div className="relative">
                        <div className="
                        inline-flex
                        items-center
                        justify-center
                        absolute
                        left-0
                        top-0
                        h-full
                        w-10
                        text-gray-400
                        ">
                        <i className="fas fa-at text-blue-500" />
                        </div>
                        <input id="email" type="email" name="email" className="
                        text-sm
                        placeholder-gray-500
                        pl-10
                        pr-4
                        rounded-2xl
                        border border-gray-400
                        w-full
                        py-2
                        focus:outline-none focus:border-blue-400
                        " placeholder="Enter your email" />
                    </div>
                </div> */}

                <div className="flex flex-col mb-6">
                <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                <div className="relative">
                    <div className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                    ">
                    <span>
                        <i className="fas fa-lock text-blue-500" />
                    </span>
                    </div>
                    <input 
                     id="password"
                     type="password"
                     name="password" 
                     autoComplete='password'
                     required
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     className="
                        text-sm
                        placeholder-gray-500
                        pl-10
                        pr-4
                        rounded-2xl
                        border border-gray-400
                        w-full
                        py-2
                        focus:outline-none focus:border-blue-400
                        " 
                     placeholder="Enter your password" 
                    />
                </div>
                </div>
                <div className="flex w-full">
                <button type="submit" className="
                    flex
                    mt-2
                    items-center
                    justify-center
                    focus:outline-none
                    text-white text-sm
                    sm:text-base
                    bg-blue-500
                    hover:bg-blue-600
                    rounded-2xl
                    py-2
                    w-full
                    transition
                    duration-150
                    ease-in
                ">
                    <span className="mr-2 uppercase">Réinitialiser</span>
                    <span>
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </span>
                </button>
                </div>
            </form>
            </div>
        </div>
        <div className="flex justify-center items-center cursor-pointer mt-6">
            <a  onClick={()=> {Navigate('/Login')}}  
            className="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
            ">
            <span className="ml-2">Mot de passe retrouvé ?
            </span><a  className="text-xs ml-2 text-blue-500 font-semibold">Se connecter</a></a>
        </div>
        </div>

    </div>
  )
}

export default ForgotPassword