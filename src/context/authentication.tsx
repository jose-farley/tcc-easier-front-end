import {createContext, useEffect, useState} from 'react';

import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface propsLogin {
  email:string  
  password:string
}

interface IContextAuth{
  email:string
  role:string
  logar: (props:propsLogin) => Promise<void>;
  deslogar: ()=> Promise<void>;
}

export const AuthContext = createContext({} as IContextAuth);

type Props ={
  children:React.ReactNode;
}

export function AuthFornecedor({children}:Props){

  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate()


  async function logar(props:propsLogin):Promise<void>{

    try {
      let {data} = await axios.post("http://localhost:8080/login", props)
      if(data.has_error) throw new Error("Invalid Password or E-mail")
      console.log(data.data)
      const token = data.data as string;
 
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('auth.token', data.data.token);
      localStorage.setItem('user.email', data.data.email);
      localStorage.setItem('user.role', data.data.role);
      localStorage.setItem('user.id', data.data.id);
      setEmail(props.email)
      setRole(data.data.role)
      if(data.data.role == 'student'){
        navigate("/aluno")
      }else{
        navigate("/professor")
      }
      
    } catch (error) {
     alert("E-mail ou senha inválidos!")
     navigate("/")
    }
      
  }
  async function deslogar():Promise<void>{
    localStorage.removeItem('auth.token');
    localStorage.removeItem('user.email');
    setEmail('')
  }
  
  useEffect(()=>{
    const token = localStorage.getItem('auth.token');
    const email = localStorage.getItem('user.email');
   
    if(token || email){
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    
  },[]);
  return (
    <AuthContext.Provider value={{email,logar, deslogar, role}}>
       {children}
    </AuthContext.Provider>

  )
}