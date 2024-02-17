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
    createdAt:string
    email:string
    id:string
    name:string
}


export function InviteAdvisor ({id, setModalIsOpen}:props){
    const [advisor, setAdvisor] = useState<ResponseModel>()
    const {register, handleSubmit} = useForm();
    async function getAdivosrs(){
        try {
            let {data} = await axios.get("http://localhost:8080/professor")
            if(data.has_error) return alert("Houve um problema ao listar os alunos")
            console.log(data.data)
            if(data.data){
                data.data.forEach((el:any)=> {
                    if(el.id == id) setAdvisor(el)
                })
            }
           
        } catch (error) {
            return alert("Houve um problema ao listar os estudantes")
        }
    }


   useEffect(()=>{
        getAdivosrs()
   }, [])

   async function handleSendInvite(data:any){
     try {
        let result = await axios.post("http://localhost:8080/professor/convidar/", {
            advisorId: advisor!.id,
            studentId:localStorage.getItem('user.id'),
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
            <Title>Você gostaria de requisitar a orientação de {advisor?.name}?</Title>
          
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