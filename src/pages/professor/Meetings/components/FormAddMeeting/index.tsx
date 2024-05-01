import axios from "axios";
import { BtnAddTask, ButtonSendTask, ContainerShowTasks, FormTask, MaintContainer, RowForm } from "./style";
import { useEffect, useState } from "react";
import { Plus } from "@phosphor-icons/react";
import zod from 'zod'
import { api } from "../../../../../api";
import { set } from "date-fns";

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
 const newAddTaskSchema = zod.object({
    menteeId: zod.string().min(1, "Você precisa selecionar um orientando."),
    DueDate:zod.string().min(1, "Você precisa informar uma data de vencimento."),
});
type FormProps = zod.infer<typeof newAddTaskSchema>
interface prop {
    setModalIsOpen(data:boolean):void
}
export function FormAddMeeting({setModalIsOpen}:prop){
   
    const [userProfessor, setUserProfessor] = useState<ProfessorResponse>()
    const [relaodMeentees, setReloadMentees] = useState(false)
    const [tasks, addTasks] = useState<Array<Task>>([])
    const [local, setLocal] = useState('')
    const [dueData, setDueDate] = useState('')
    const [mentee, setMentee] = useState('')

    async function getAdvisor(){
        try {
            let {data} = await axios.get("http://localhost:8080/professor")
            if(data.has_error) return alert("Houve um problema ao se comunicar com o servidor.")
            const professor  = data.data.find((el:any)=>{if(el.id === localStorage.getItem('user.id'))return el})
            setUserProfessor(professor)
            
        } catch (error) {
            setReloadMentees(!relaodMeentees)
            return alert("Houve um problema ao se comunicar com o servidor.")
        }
    }
    function handleAddTask(task:string){
        if(tasks.length < 6){
            if(local.length <= 0) return alert("Você precisa informar uma tarefa.")
            addTasks([...tasks, {taskname:task, status:false, groupId:localStorage.getItem('user.id')!}])
            
            setLocal('')
        }else {
            alert("Você atingiu o número máximo de tarefas.")
        }
    }
    useEffect(()=>{
        getAdvisor()
    }, [relaodMeentees])

    async function handleSendTask(){

        let  dataToSend = {
            due: dueData,
            mentee: mentee,
            advisor: localStorage.getItem("user.id"),
            local: local
        }
        if(dataToSend.mentee.length<=0) return alert("Você precisa selecionar um orientando")
        let dateReceivedIsPassed = verifyDate(dataToSend.due)
        if(dateReceivedIsPassed) return alert("Você precisa fornecer uma data e hora válida.")
        if(dataToSend.local.length<=2) return alert("Você precisa definir um local para a reunião.")
        try {
            let {data} = await api.post("/professor/reunioes", dataToSend)

            console.log(data)
            setModalIsOpen(false)
        } catch (error) {
           return alert("Houve um probelma ao cadastrar a reunião") 
        }
        
    }
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
    function handleSelectOption(value:string){
        setMentee(value)
        
    }
    return(
        <MaintContainer>
            <FormTask>
                <RowForm>
                    <label htmlFor="">Orientando</label>
                    <select className="form-select" onChange={(event)=>{handleSelectOption(event.target.value)}}  >
                        <option value="none"  defaultChecked >Selecione um orientando</option>
                        {
                            userProfessor?.mentees.map((el)=>{
                                return(
                                    <option key={el.id} value={el.id}>
                                        {el.name}
                                    </option>  
                                )
                            })
                        }
                    </select>
                </RowForm>
                <RowForm> 
                    <label htmlFor="">Data e Horário</label>
                    <input value={dueData} className='form-control' type="datetime-local" id="dataEntrega" name="dataEntrega" onChange={(event)=>{setDueDate(event.target.value)}}/>
                </RowForm>
                <RowForm> 
                    <label htmlFor="">Local</label>
                    <input  value={local} onChange={(event)=>{setLocal(event.target.value)}} className='form-control' type="text" id="dataEntrega" name="dataEntrega"/>
                   
                </RowForm>
                
                <ButtonSendTask
                    type="button"
                    className="btn btn-success"
                    onClick={handleSendTask}
                   
                >
                    Enviar
                </ButtonSendTask> 
            </FormTask>
        </MaintContainer>
    )
    
}