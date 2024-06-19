import axios from "axios"
import { useEffect, useState } from "react"
import { ContainerAdvisorInfo, ContainerInvites, DivMsgInvites, IdentificatorTxt, Tittle } from "../../../../student/Advisors/style"
import { Modal } from "../../../../../components/Modal/Modal"
import { ProfessorInviteList } from "../../../../../components/ProfessorInviteList"
import { ButtonRequest, Tabela } from "../../style"
import { InviteStudent } from "../../../../../components/InviteStudent"
import { Title } from "../../../../../components/InviteStudent/style"
import {ContainerContent, Text} from './style'
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



export function StudentWithoutAdvisor(){
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
            return alert("Houve um problema ao listar os estudantes")
        }
    }

    useEffect(()=>{
    getStudents()
    getAdvisor()
    }, [reloadStudentInfo])

    if(students.length > 0){
        return (
            <ContainerContent>
                <Tittle>Estudantes sem orientador</Tittle>
                <Tabela>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Telefone</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(el => {
                            return (
                                <tr>
                                    <td>{el.name}</td>
                                        <td>{el.email}</td>
                                        <td>{el.phoneNumber}</td>
                                    <td><ButtonRequest
                                        className="btn btn-success"
                                        onClick={()=>{
                                        
                                            setStudentId(el.id)
                                            setModalIsOpen(true);
                                        }}
                                    >
                                        Oferecer orientação
                                    </ButtonRequest ></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    {
                        (modalIsOpen)?
                        <Modal
                            content={<InviteStudent id={studentId} setModalIsOpen={setModalIsOpen}/>}
                            size='default'
                            setModalIsOpen={setModalIsOpen}
                        />
                        :null
                    }
                </Tabela>  
            </ContainerContent>
               
        ) 
    }else{
        return(
            <ContainerAdvisorInfo>
                <Tittle>Estudantes sem orientador</Tittle>
                <Text>(Nenhum estudante encontrado.)</Text>
            </ContainerAdvisorInfo>
            
        )
    }
   
}