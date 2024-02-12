import axios from "axios"
import { useEffect, useState } from "react"
import { ButtonSend, ContainerStudentInfo, FormInvite, MessageTA, Row, Title } from "./style"
import { useForm } from "react-hook-form"


import { useNavigate } from "react-router-dom"

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


export function InviteStudent ({id, setModalIsOpen}:props){
    console.log(id)
    const [student, setStudent] = useState<ResponseModel>()
    const {register, handleSubmit} = useForm();
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

   async function handleSendInvite(data:any){
     try {
        let result = await axios.post("http://localhost:8080/aluno/convite", {
            advisorId:localStorage.getItem('user.id'),
            studentId:id,
            message:data.message
        })
        if(result.data.has_error) return alert("Houve um problema ao se comunicar com o servidor.")
        setModalIsOpen(false)
     } catch (error) {
        return alert("Houve um problema ao se comunicar com o servidor.")
     }
   }
    return (
        <ContainerStudentInfo>
            <Title>Você gostaria de oferecer orientção para {student?.name}?</Title>
            <Row>
                <Title>(Tema):</Title><span>{student?.theme}</span>
            </Row>
            <Row>
                <Title>(Descrição):</Title><span>{student?.description}</span>
            </Row>
            <FormInvite onSubmit={handleSubmit(handleSendInvite)}>
                <MessageTA {...register('message')} placeholder="Deixe uma mensagem."></MessageTA>
                <ButtonSend
                    className="btn btn-success"
                    type="submit"
                >
                    Enviar
                </ButtonSend>
            </FormInvite>
       
        </ContainerStudentInfo>
    )
}