import { useState } from "react";
import { ButtonRemove, ButtonSendTask, ContainerForm, Row } from './style';
import {Trash} from "@phosphor-icons/react"
import { api } from "../../../../../../api";



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

 interface Task {
    taskname:string
    groupId:string
    status:boolean
 }

 interface Meeting {
    advisorId: string;
    due: string;
    id: string;
    local: string;
    advisor: Advisor;
    student: Mentee;
}

interface Advisor {
    cpf: string;
    createdAt: string;
    email: string;
    id: string;
    name: string;
    role: string;
}

interface Mentee {
    advisorId: string;
    course: string;
    createdAt: string;
    description: string;
    email: string;
    id: string;
    name: string;
    phoneNumber: string;
    registration: string;
    role: string;
    theme: string;
}
interface props {
    setModalIsOpen(data:boolean):void
    refresh(data:boolean):void
    meeting: Meeting
}
export function FormEditMeeting({meeting, setModalIsOpen, refresh}:props){

    function verifyDate(receivedDateHour:string) {
        let now = new Date();
        if(receivedDateHour.length<=0) return true
        let dateHour = new Date(receivedDateHour);
    
        if (dateHour < now) {
            return true;
        } else {
            return false;
        }
    }
    const [userProfessor, setUserProfessor] = useState<ProfessorResponse>()
    const [mentee, setMentee] = useState(meeting.student.id)
    const [dueData, setDueDate] = useState(meeting.due)
    const [local, setLocal] = useState(meeting.local)

    function handleSelectOption(value:string){
        setMentee(value)
        
    }
    async function SendMeeting(){
        let  dataToSend = {
            due: dueData,
            id: meeting.id,
            advisor: localStorage.getItem("user.id"),
            local: local
        }
        let dateReceivedIsPassed = verifyDate(dataToSend.due)
        if(dateReceivedIsPassed) return alert("Você precisa fornecer uma data e hora válida.")
        if(dataToSend.local.length<=2) return alert("Você precisa definir um local para a reunião.")
        
        try {
            let {data} = await api.put("/professor/reunioes", dataToSend)
            refresh((prev:any)=>!prev)
            setModalIsOpen(false)
        } catch (error) {
            return alert("Houve um probelma ao editar a reunião.") 
        }
        

    }

    async function RemoveMeeting(){
        try {
            await api.delete("/professor/reunioes", {
                data:{
                    id:meeting.id
                }
            })
            refresh((prev:any)=>!prev)
            setModalIsOpen(false)
        } catch (error) {
            return alert("Houve um probelma ao remover a reunião.") 
        }
    }

    return (
        <ContainerForm>
            <Row>
                <label htmlFor="">Orientando</label>
                    <select className="form-select" onChange={(event)=>{handleSelectOption(event.target.value)}}  >
                        <option value="none"  defaultChecked >Selecione um orientando</option>
                
                        return(
                            <option key={meeting.id} value={meeting.id}>
                                {meeting.student.name}
                            </option>  
                        )
                            
                        
                    </select>
            </Row>
            <Row>
                <label htmlFor="">Data e Horário</label>
                <input value={dueData} className='form-control' type="datetime-local" id="dataEntrega" name="dataEntrega" onChange={(event)=>{setDueDate(event.target.value)}}/>
            </Row>
            <Row>
                <label htmlFor="">Local</label>  
                <input  value={local} onChange={(event)=>{setLocal(event.target.value)}} className='form-control' type="text" id="dataEntrega" name="dataEntrega"/>         
            </Row>
            <Row>
            <ButtonRemove
                type="button"
                className="btn btn-danger"
                onClick={RemoveMeeting}
            >
                <Trash />
            </ButtonRemove>

            <ButtonSendTask
                    type="button"
                    className="btn btn-success"
                    onClick={SendMeeting}
                   
                >
                    Salvar
                </ButtonSendTask> 
           
            </Row>
        </ContainerForm>

    )
}