import React, {useState, useRef, useEffect} from "react";
import {storage} from '../../firebase'
import {ref,getStorage, uploadBytes, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from "../../firebase";
import { Timestamp, doc, setDoc} from "firebase/firestore";
import Tooltip from '@mui/material/Tooltip';

import {collection, getDocs,addDoc, query, where } from 'firebase/firestore';






function OtherInfo({setPage, formData, setFormData }) {
  const navigate = useNavigate()
  const [per, setPerc] = useState(null);
  const inputRef = useRef(null);
  const [time, setTime] = React.useState(new Date()) ;
    const [date, setDate] = React.useState(new Date());
  const [data, setData] = useState('');
  const [file, setFile] = useState("");
  const [users, setUsers] = useState([]);
  const [details, setDetails] = useState([]);
  const [medecin  , setMedecin] = useState([]);

  
console.log(formData.code)

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };

  const q = query(collection(db,'users'), where('code','==',`${formData.code}`));
  useEffect(() => {
      const getUsers = async() => {
        const querySnapshot = await getDocs(q);
        let det = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          det.push(doc.data().uid)
        });
        setMedecin(det)
        setDetails(det[0])

          // const data = await getDocs(q);
       
          // setUsers(data.docs.map((doc) => ({...doc.data(),id: doc.id})));
      };
       
      getUsers();  
  }, []);
console.log(details)

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
  
      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData(downloadURL );
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  


  const handleSubmit = async () => {
    const {nom,prenom, email, password,age, sexe, taille, poids, hba1c, typeDiab, traitement, code
    } = formData  
    
    console.log(formData)
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
            Age : age,
            Sexe : sexe,
            poids,
            taille,
            hba1c,
            typeDiab,
            traitement,
            photoURL     : data? data : 'https://bip.cnrs.fr/wp-content/uploads/2019/11/user.jpg',
            createdAt    :Timestamp.fromDate(new Date()),
            hypertension : '',
            allergie     : '',
            anDaig       : '',
            cardiaque    : '',
            cholesterol  : '',
            type         : 'patient',
            doctorID     : details? details : '',
            Hypothyroidie    : '',
            autre            : ''
            
        
        })
        await setDoc(doc(db, 'patients', result.user.uid), {
          uid          :result.user.uid,
          type         : 'patient',
          doctorID        : details? details : '',
          nom,
          prenom,
          email,
          password,
          Age : age,
          Sexe : sexe,
          poids,
          taille,
          hba1c,
          typeDiab,
          traitement,
          photoURL     : data? data : 'https://bip.cnrs.fr/wp-content/uploads/2019/11/user.jpg',
          createdAt    :Timestamp.fromDate(new Date()),
          hypertension : '',
          allergie     : '',
          anDaig       : '',
          cardiaque    : '',
          cholesterol  : '',
          Hypothyroidie    : '',
          autre            : ''
        })
        await addDoc(collection(db, 'patients', result.user.uid,'myDoctor'), {
          uid          :result.user.uid,
          doctorID        : details? details : '',
          codeDoc :    code,
          // nom : medecin? medecin.nom : '',
          // prenom : medecin? medecin.prenom : '',
          // photoURL : medecin? medecin.photoURL : ''
        })
        // const docRef1 = doc(db, "glucose", `${date.toLocaleDateString('de-DE')}` );
        // await setDoc(docRef1, {
        //   day : '',
        //   gluco : '',
        //   user: '',
        // })

       
        .then(res=>{
            console.log(res)
          })                    
        } catch (error) {
          console.log(error)
          return
        }
  navigate('/Dashboard/')

};


  return (
   <div className="flex min-h-96  flex-col ">
     <div className=" flex  py-3 ml-12 justify-center self-center">
        <div className="left">
           
              
        <input
           ref={inputRef}
           type='file'
           accept='img/*'
           className="bg-8 hidden" 
           onChange={(e) => setFile(e.target.files[0])}
         />
           
           <Tooltip title="Ajouter une photo de profil" arrow>
          
          <img 
            className="h-40 w-40 rounded-full " 
            onClick={handleClick}
            src={
              file
              ? URL.createObjectURL(file)
              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
          /></Tooltip>
        </div> 
      </div>

     <div className="flex flex-row justify-between ">
        <button disabled={per !== null && per < 100} 
          onClick={() => {setPage((currPage) => currPage - 1);}}
          className="text-white bg-6 hover:bg-blue-800 focus:ring-4
                 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
           Retour
        </button>

        <button onClick={() => {handleSubmit()}} 
        className="text-white bg-6 hover:bg-blue-800 focus:ring-4
        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
          S'inscrire
        </button>
               
      </div> 
    </div>  
  );
}

export default OtherInfo;