import axios from "axios";
import { BtnAddTask, ButtonSendTask, ContainerShowTasks, FormTask, MaintContainer, RowForm } from "./style";
import { useContext, useEffect, useState } from "react";
import { Plus } from "@phosphor-icons/react";
import zod from 'zod'
import { api } from "../../../../../api";
import { AuthContext } from "../../../../../context/authentication";

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
export function FormAddTask({setModalIsOpen}:prop){
   
    const [userProfessor, setUserProfessor] = useState<ProfessorResponse>()
    const [tasks, addTasks] = useState<Array<Task>>([])
    const [actualTask, setActualTask] = useState('')
    const [dueData, setDueDate] = useState('')
    const [mentee, setMentee] = useState('')
    const {setRefreshTasks} = useContext(AuthContext)
    async function getAdvisor(){
        try {
            let {data} = await axios.get("http://localhost:8080/professor")
            if(data.has_error) return alert("Houve um problema ao se comunicar com o servidor.")
            const professor  = data.data.find((el:any)=>{if(el.id === localStorage.getItem('user.id'))return el})
            setUserProfessor(professor)
            
        } catch (error) {
        return alert("Houve um problema ao se comunicar com o servidor.")
        }
    }
    function handleAddTask(task:string){
        if(tasks.length < 6){
            if(actualTask.length <= 0) return alert("Você precisa informar uma tarefa.")
            addTasks([...tasks, {taskname:task, status:false, groupId:localStorage.getItem('user.id')!}])
            
            setActualTask('')
        }else {
            alert("Você atingiu o número máximo de tarefas.")
        }
    }
    useEffect(()=>{
        getAdvisor()
    }, [])

    async function handleSendTask(){
        if(mentee.length<=0) return alert("Você precisa selecionar um orientando.")
        let res = verifyDate(dueData)
        if(res == "A data fornecida é anterior à data atual.") return alert(res)
        if(tasks.length<=0) return alert("Você precisa informar pelo menos uma tarefa.")
        
        try {
            let {data} = await api.post("/professor/tarefas/adicionar", {
                id:localStorage.getItem('user.id'),
                dueDate:dueData,
                mentee:mentee,
                task: [...tasks]
            }) 
            setRefreshTasks((prev)=>!prev)
            setModalIsOpen(false)
        } catch (error) {
            alert("Houve um problema ao se comunicar com o servidor.")
        }
      
        
    }
    function verifyDate(receivedDate:string) {
        if(receivedDate.length <= 0 ) return alert('Você precisa fornecer uma data de entrega para as atividades.')
        const today = new Date();
        const parts = receivedDate.split('-');
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);
        const dataFornecida = new Date(year, month - 1, day); 
        if (dataFornecida < today) {
            return "A data fornecida é anterior à data atual."
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
                    <label htmlFor="">Data de entrega</label>
                    <input value={dueData} className='form-control' type="date" id="dataEntrega" name="dataEntrega" onChange={(event)=>{setDueDate(event.target.value)}}/>
                </RowForm>
                <RowForm> 
                    <label htmlFor="">Adicionar tarefa</label>
                    <input  value={actualTask} onChange={(event)=>{setActualTask(event.target.value)}} className='form-control' type="text" id="dataEntrega" name="dataEntrega"/>
                    <BtnAddTask 
                        type="button"
                        onClick={()=>{handleAddTask(actualTask)}}
                        className="btn btn-success"
                    >
                            <Plus size={20} />
                    </BtnAddTask>
                </RowForm>
                <ContainerShowTasks>
                        <ul>
                            {
                                tasks.map(el =>{
                                    return (
                                        <li key={el.taskname + new Date().toISOString()}>{el.taskname}</li>
                                    )
                                })
                            }
                        </ul>
                </ContainerShowTasks>   
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