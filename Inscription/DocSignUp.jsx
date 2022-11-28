import React, { useState, useRef, useEffect } from "react";
import SignUpInfo from "./InfoPerso";
import PersonalInfo from "./InfoMedical";
import OtherInfo from "./Cheeze";
import register from '../../assets/registerPP.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from "../../firebase";
import { Timestamp, doc, setDoc} from "firebase/firestore";
import {storage} from '../../firebase'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {v4} from 'uuid'
import ImgSkeleton from "./ImgSkeleton";
import validation from "./Validation";
import Doc from "./Doc";
import { addDoc, updateDoc, onSnapshot, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import Register from './Register';
import DocInfo from './DocInfo';

import loginpic from '../../assets/loginpic.jpg'


function DocSignUp() {
  const [error, setError] = useState('')

  const [page, setPage] = useState(0);
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false);
  const [users, setUsers] = useState([]);
  const [details, setDetails] = useState([]);

  const [formData, setFormData] = useState({
    nom              : '',
    prenom           : '',
    email            : '',
    password         : '',
    confirmPassword  : '',

    numOrdre         : '',
    specialite       : '',
    endroit          : '',


  });


  const FormTitles = ["Informations personnelles ", "Informations professionnelles"];


  const PageDisplay = () => {
    if (page === 0) {
      return <Register   page={ page } setPage={setPage} formData={ formData } setFormData={setFormData}  />
    } else if (page === 1) {
      return <DocInfo page={ page } setPage={setPage} formData={ formData } setFormData={setFormData}  />
    }
   };


  return (
    <div className="min-w-full block md:flex md:flex-row ">
        

        <div className="flex flex-col p-4 w-full md:w-1/2">
          <div className="mb-4">
            <h1 class="text-8 font-bold text-center text-4xl font-sans">Mellitus</h1>
            {/* <h1 class="text-gray-800 font-bold text-2xl mb-1">Welcome !</h1> */}
          </div>

          <div className="items-center w-full">
            <div className="bg-1">
              <div
                style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}
              ></div>
            </div>

            <div className="w-full  rounded-2xl p-4  ">
              <div className="">
                <h1 className="text-center text-2 font-medium text-xl mb-3">{FormTitles[page]}</h1>
              </div>
              <div className="  flex-col flex my-4 w-full p-2  ">
                {PageDisplay()}
                <div className="flex justify-center items-center cursor-pointer mt-6">
            <a  onClick={()=> {navigate('/Login')}}  
            className="
            inline-flex
            text-gray-700
            font-medium
            text-xs 
            ">
            <span className="ml-2">Déjà membre?
              </span><a  className="text-xs ml-2 text-blue-500 font-semibold">Se connecter</a></a>
             </div>
              </div>
          </div>
          
          </div>
        </div>
        <div class="flex items-center self-center  w-1/2  ">
          <img  className='h-2/3  object-fit' src={loginpic} alt="" />
        </div>
    </div>
  );
}

export default DocSignUp;