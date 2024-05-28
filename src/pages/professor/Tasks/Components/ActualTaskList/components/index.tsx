import { Trash } from "@phosphor-icons/react";
import { ButtonRemove, ContainerTasks, Item, List, Status, Subtitle } from "./style";
import { api } from "../../../../../../api";
import { useContext } from "react";
import { AuthContext } from "../../../../../../context/authentication";

interface ITask {
    groupId: string;
    id: string;
    status: boolean;
    taskname: string;
}

interface props {
    data:Array<ITask>
    groupId:string
    closeModal(data:boolean):void

}
export function ShowTaskList({data, groupId, closeModal}:props){
    const {setRefreshTasks} = useContext(AuthContext)
   async function removeTask(){
       try {
        await api.delete("/professor/tarefas", {
            data:{
                id:groupId
            }
        })
        setRefreshTasks((prev)=>!prev)
        closeModal(false)
       } catch (error) {
        return alert("Houve um problema ao remover as tarefas.")
       }
    }
    return (
        <ContainerTasks>
            
            <List>
                <Subtitle>Tarefas</Subtitle>
                {
                    data.map((el:ITask)=>{
                        return (
                            <Item>
                            {el.taskname}

                            <Status disabled type="checkbox" checked={el.status}/>
                            
                            </Item>
                            
                        )
                    })
                }
                <ButtonRemove
                    type="button"
                    className="btn btn-danger"
                    onClick={removeTask}
                >
                    <Trash />
                </ButtonRemove>
            </List>
        </ContainerTasks>
    )
}