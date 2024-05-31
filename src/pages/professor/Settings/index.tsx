import { useContext, useEffect, useState } from "react";
import { ButtonEditPassword, ButtonRemoveAccount, CaixaDeTexto, CaixaDeTextoEmail, ContainerForm, MainContent, Row, SwitchContainer, SwitchInput, SwitchLabel, Tittle } from "./style";
import { api } from "../../../api";
import { EnvelopeSimple, Lock, SignOut } from '@phosphor-icons/react';
import { Modal } from "../../../components/Modal/Modal";
import { FormRemoveAccount } from "./components/formRemoveAccount";
import { AuthContext } from "../../../context/authentication";
import * as zod from "zod"
import { FormEditPassword } from "./components/formEditPassword";


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
    receivingMentees:boolean
    id:string
    name: string
    professorInvites:Array<ProfessorInvites>

 }


export function ProfessorSettingPage(){
    const [userProfessor, setUserProfessor] = useState<ProfessorResponse>()
    const [professors, setProfessor] = useState<Array<ProfessorResponse>>([])
    const [receivingMentee, setReceivingMentee] = useState(true)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {deslogar} = useContext(AuthContext)

    


    async function getAdvisor(){
        try {
              let {data} = await api.get("/professor")
              if(data.has_error) return alert("Houve um problema ao se comunicar com o servidor.")
               
              const professor  = data.data.find((el:any)=>{if(el.id === localStorage.getItem('user.id'))return el})
                console.log(professor)
              setUserProfessor(professor)
              setReceivingMentee(professor.receivingMentees)
              setProfessor(data.data)
            
        } catch (error) {
           return alert("Houve um problema ao se comunicar com o servidor.")
        }
     }
     useEffect(()=>{
        getAdvisor()
     },[])
     async function changeStatus(){
       
        try {
            await api.put("/professor/alterar/status", {
                id:userProfessor?.id,
                status:!receivingMentee
            })
            setReceivingMentee((prev)=>!prev)
        } catch (error) {
            return alert("Houve um problema ao alterar o status.")
        }
     }
     function handleClickEditPassword (){
        setModalIsOpen(true)
     }

     if(userProfessor){
        return (
        
            <MainContent>
                <Tittle>{userProfessor.name}</Tittle>
                <ContainerForm>
                    <Row>
                        <span>Alterar senha:</span>
                        <ButtonEditPassword 
                            onClick={handleClickEditPassword}
                            className="btn btn-success">Alterar
                        </ButtonEditPassword>
                    </Row>
                    <Row>
                       <span>Recebendo orientandos:</span> 
                        <SwitchContainer>
                            <SwitchInput
                            type="checkbox"
                            id="switch"
                            // checked={checked}
                            // onChange={onChange}
                            />
                            <SwitchLabel onClick={changeStatus} htmlFor="switch" checked={receivingMentee} />
                        </SwitchContainer>
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