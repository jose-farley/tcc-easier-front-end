import { useEffect, useState } from "react";
import { ButtonRemoveAccount, CaixaDeTexto, ContainerForm, MainContent, Row, Tittle } from "./style";
import { api } from "../../../api";
import { EnvelopeSimple, Lock, Warning } from '@phosphor-icons/react';
import { Modal } from "../../../components/Modal/Modal";
import { FormRemoveAccount } from "./components/formRemoveAccount";
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
export function ProfessorSettingPage(){
    const [userProfessor, setUserProfessor] = useState<ProfessorResponse>()
    const [professors, setProfessor] = useState<Array<ProfessorResponse>>([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    
    async function getAdvisor(){
        try {
              let {data} = await api.get("/professor")
              if(data.has_error) return alert("Houve um problema ao se comunicar com o servidor.")

              const professor  = data.data.find((el:any)=>{if(el.id === localStorage.getItem('user.id'))return el})
             console.log(data.data)
              setUserProfessor(professor)
              setProfessor(data.data)
            
        } catch (error) {
           return alert("Houve um problema ao se comunicar com o servidor.")
        }
     }
     useEffect(()=>{
        getAdvisor()
     },[])

     if(userProfessor){
        return (
        
            <MainContent>
                <Tittle>{userProfessor.name}</Tittle>
                <ContainerForm>
                    <Row>
                        <EnvelopeSimple size={25}/>
                        <CaixaDeTexto className="form-control" value={userProfessor.email} type="text"  disabled/>
                    </Row>
                    <Row>
                        <Lock size={25} />
                        <CaixaDeTexto className="form-control" value={"********"} type="text"  disabled/>
                    </Row>
                </ContainerForm>
                <Row>
                    <Warning size={25} color="#E57070"/>
                    <ButtonRemoveAccount 
                        onClick={()=>{setModalIsOpen(!modalIsOpen)}}
                    className="btn btn-success">Remover conta</ButtonRemoveAccount>
                </Row>
               
                {
                (modalIsOpen)?
                <Modal
                    content={<FormRemoveAccount id={userProfessor.id} />}
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