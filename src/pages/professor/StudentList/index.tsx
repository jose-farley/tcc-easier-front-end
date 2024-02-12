import axios from "axios"
import { useEffect, useState } from "react"
import { ButtonRequest, MainContent, Tabela } from "./style"
import { Modal } from "../../../components/Modal/Modal"
import { InviteStudent } from "../../../components/InviteStudent"


interface ResponseModel {
    name:string
    email:string
    course:string
    createdAt:string
    id:string
    phoneNumber:string
    registration:string
}

export function StudentListPage(){
    const [students, setStudents] = useState<Array<ResponseModel>>([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [studentId, setStudentId] = useState('')
    async function getStudents(){
        try {
            let {data} = await axios.get("http://localhost:8080/aluno")
            if(data.has_error) return alert("Houve um problema ao listar os alunos")
            let result = data.data.filter((el:any) => {
                if(el.advisorId == null) return el
            })
            console.log(result)
            setStudents(result)
        } catch (error) {
            return alert("Houve um problema ao listar os estudantes")
        }
    }


   useEffect(()=>{
      getStudents()
   }, [])


    return (
        <MainContent>
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
        </MainContent>
            
    )
}