import { useEffect, useState } from "react";
import { MainContainer, WellComeText } from "./style";
import axios from "axios";




export interface Student {
   advisorId:string
   course:string
   createdAt:string
   description:string
   email:string
   id:string
   invites:[]
   name:string
   phoneNumber:string
   registration:string
   theme:string
}

export function HomePage(){
   const [student, setStudent] = useState<Student>()

   async function getStudentInfo(){
      try {
       let {data} = await  axios.get("http://localhost:8080/aluno") 
       if(data.has_error) return alert("Houve um problema ao se comunicar com o servidor.")
      let studentFound = data.data.find((el:Student) =>{
         if(el.id == localStorage.getItem('user.id')) return el
      })
       setStudent(studentFound)
      } catch (error) {
         return alert("Houve um problema ao se comunicar com o servidor.")
      }
   }
   useEffect(()=>{
      getStudentInfo()
   },[])

   return (
      <MainContainer>
         <WellComeText>Seja bem-vindo {student?.name}</WellComeText>
         <div>

         </div>
      </MainContainer>
   )
}