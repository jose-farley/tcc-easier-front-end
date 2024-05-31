import { useContext, useEffect, useState } from "react"
import { api } from "../../../api"
import { ButtonEditPassword, ButtonRemoveAccount, ContainerForm, MainContent, Row, Tittle } from "./style"
import { SignOut } from "@phosphor-icons/react"
import { Modal } from "../../../components/Modal/Modal"
import { AuthContext } from "../../../context/authentication"
import { FormEditPassword } from "./components/formEditPassword"

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
export function SettingsPage(){
   const [student, setStudent] = useState<Student>()
   const [modalIsOpen, setModalIsOpen] = useState(false)
   const {deslogar} = useContext(AuthContext)
   
   async function getStudentInfo(){
      try {
       let {data} = await  api.get("/aluno") 
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
   }, [])
   
   function handleClickEditPassword(){
      setModalIsOpen(true)
   }
   
   if(student){
      return (
            <MainContent>
               <Tittle>{student.name}</Tittle>
               <ContainerForm>
                  <Row>
                        <span>Alterar senha:</span>
                        <ButtonEditPassword 
                           onClick={handleClickEditPassword}
                           className="btn btn-success">Alterar
                        </ButtonEditPassword>
                  </Row>
               </ContainerForm>
               <Row>
                  <SignOut size={25} color="#E57070"/>
                  <ButtonRemoveAccount 
                        onClick={()=>{deslogar()}}
                  className="btn btn-success">Deslogar</ButtonRemoveAccount>
               </Row>
               
               {
                  (modalIsOpen)?
                  <Modal
                        content={<FormEditPassword closeModal={setModalIsOpen} />}
                        size='large'
                        setModalIsOpen={setModalIsOpen}
                  />
                  :null
               }
            </MainContent>
      )
   }else{
      return(
            <MainContent>
               <Tittle>Carregando...</Tittle>
            </MainContent>
      )
   }
   
}