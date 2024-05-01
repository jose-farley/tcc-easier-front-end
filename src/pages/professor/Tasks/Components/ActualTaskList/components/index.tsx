import { ContainerTasks, Item, List, Status, Subtitle } from "./style";

interface ITask {
    groupId: string;
    id: string;
    status: boolean;
    taskname: string;
}

interface props {
    data:Array<ITask>
}
export function ShowTaskList({data}:props){
    console.log(data)
    return (
        <ContainerTasks>
            
            <List>
                <Subtitle>Tarefas</Subtitle>
                {
                    data.map((el:ITask)=>{
                        return (
                            <Item>
                            {el.taskname}

                            <Status condition={el.status}/>
                            </Item>
                        )
                    })
                }
                
            </List>
        </ContainerTasks>
    )
}