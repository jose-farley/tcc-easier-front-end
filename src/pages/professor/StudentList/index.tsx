import axios from "axios"
import { useEffect, useState } from "react"
import { ButtonRequest, MainContent, Tabela } from "./style"
import { Modal } from "../../../components/Modal/Modal"
import { InviteStudent } from "../../../components/InviteStudent"
import { ContainerAdvisorInfo, ContainerInvites, DivMsgInvites, IdentificatorTxt, Tittle, Text } from "../../student/Advisors/style"
import { StudentInviteList } from "../../../components/StudentInviteList"
import { ProfessorInviteList } from "../../../components/ProfessorInviteList"
import { AdvisorInvites } from "./components/Invites"
import { StudentWithoutAdvisor } from "./components/studentsWithoutAdvisor"
import { MenteesList } from "./components/MenteesList"


interface ResponseModel {
    name:string
    email:string
    course:string
    createdAt:string
    id:string
    phoneNumber:string
    registration:string
}
interface ProfessorInvites {
    advisorId:string
    createdAt:string
    id:string
    mensagem:string
    professorName:string
    studentId:string
}
interface ProfessorResponse {
    createdAt: string
    email: string
    id:string
    name: string
    professorInvites:Array<ProfessorInvites>

 }
export function StudentListPage(){
    const [students, setStudents] = useState<Array<ResponseModel>>([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [studentId, setStudentId] = useState('')
    const [professors, setProfessor] = useState<Array<ProfessorResponse>>([])
    const [userProfessor, setUserProfessor] = useState<ProfessorResponse>()
    const [modalInvites, setModalInvitesIsOpen] = useState(false)
    const [reloadStudentInfo, setReloadStudentInfo] = useState(false)


    async function getAdvisor(){
        try {
              let {data} = await axios.get("http://localhost:8080/professor")
              if(data.has_error) return alert("Houve um problema ao se comunicar com o servidor.")

              const professor  = data.data.find((el:any)=>{if(el.id === localStorage.getItem('user.id'))return el})
             
              setUserProfessor(professor)
              setProfessor(data.data)
            
        } catch (error) {
           return alert("Houve um problema ao se comunicar com o servidor.")
        }
     }
    async function getStudents(){
        try {
            let {data} = await axios.get("http://localhost:8080/aluno")
            if(data.has_error) return alert("Houve um problema ao listar os alunos")
            let result = data.data.filter((el:any) => {
                if(el.advisorId == null) return el
            })
            setStudents(result)
        } catch (error) {
            console.log(error)
            return alert("Houve um problema ao listar os estudantes")
        }
    }

    
   useEffect(()=>{
      getStudents()
      getAdvisor()
    }, [reloadStudentInfo])
    
    return (    
        <MainContent>
            <AdvisorInvites />
            <StudentWithoutAdvisor />
            <MenteesList />
        </MainContent> 
     )      
    
}