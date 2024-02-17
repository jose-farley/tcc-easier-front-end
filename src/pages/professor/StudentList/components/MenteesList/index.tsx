import axios from "axios"
import { useEffect, useState } from "react"
import { ContainerAdvisorInfo, IdentificatorTxt, Tittle } from "../../../../student/Advisors/style"
import { ButtonRequest, Tabela } from "../../style"
import { Modal } from "../../../../../components/Modal/Modal"
import { InviteStudent } from "../../../../../components/InviteStudent"

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
interface Mentees {
    advisorId:string
    course:string
    createdAt:string
    description:string
    email:string
    id:string
    name:string
    password:string
    phoneNumber:string
    registration:string
    role:string
    theme:string
}

interface ProfessorResponse {
    createdAt: string
    email: string
    id:string
    name: string
    mentees: Array<Mentees>
    professorInvites:Array<ProfessorInvites>

 }




export function MenteesList(){

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


    console.log('dados do professor: ', userProfessor)

    if(userProfessor && userProfessor.mentees.length > 0){

        return( 
            <>
                <Tittle>Lista de orientandos</Tittle>
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
                        {userProfessor.mentees.map(el => {
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
                                        Visualizar informações
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
            </>
                   
        )
    
    }

}