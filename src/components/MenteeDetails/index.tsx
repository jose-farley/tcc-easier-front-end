import axios from "axios"
import { useEffect, useState } from "react"
import { ContainerStudentInfo, Row, Title } from "./style"

interface props {
    id:string
    setModalIsOpen(data:boolean):void
}

interface ResponseModel {
    name:string
    email:string
    course:string
    createdAt:string
    id:string
    phoneNumber:string
    registration:string
    description:string 
    theme:string
}


export function StudentDetails ({id, setModalIsOpen}:props){
    
    const [student, setStudent] = useState<ResponseModel>()
    async function getStudents(){
        try {
            let {data} = await axios.get("http://localhost:8080/aluno")
            if(data.has_error) return alert("Houve um problema ao listar os alunos")
            if(data.data){
                data.data.forEach((el:any)=> {
                    if(el.id == id) setStudent(el)
                })
            }
           
        } catch (error) {
            return alert("Houve um problema ao listar os estudantes")
        }
    }


   useEffect(()=>{
      getStudents()
   }, [])

    return (
        <ContainerStudentInfo>
            <Title>{student?.name}</Title>
            <Row>
                <Title>(Tema):</Title><p>{student?.theme}</p>
            </Row>
            <Row>
                <Title>(Descrição):</Title><p>{student?.description}</p>
            </Row>
           
        </ContainerStudentInfo>
    )
}