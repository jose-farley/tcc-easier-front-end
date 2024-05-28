import { useState } from "react";
import { ButtonEdit, ContainerTasks, Item, List, Status, Subtitle } from "./style";
import { api } from "../../../../../../api";

interface ITask {
    groupId: string;
    id: string;
    status: boolean;
    taskname: string;
}

interface Props {
    data: Array<ITask>;
    refresh(data:boolean):void
    close(data:boolean):void
}

interface ISoloTask {
    id: string;
    status: boolean;
}

export function ShowTaskListPasted({ data: initialData, refresh, close }: Props) {
    const [data, setData] = useState<Array<ITask>>(initialData);
    const [tasks, setTasks] = useState<Array<ISoloTask>>([]);

    function handleTicktask(id: string, status: boolean) {
        // Atualiza o estado das tarefas
        const updatedData = data.map((task) =>
            task.id === id ? { ...task, status: !status } : task
        );
        setData(updatedData);

        // Atualiza o estado das tarefas a serem enviadas
        setTasks((prevTasks) => {
            const existingTask = prevTasks.find((task) => task.id === id);
            if (existingTask) {
                // Se já existe, atualiza o status
                return prevTasks.map((task) =>
                    task.id === id ? { ...task, status: !status } : task
                );
            } else {
                // Se não existe, adiciona ao array
                return [...prevTasks, { id, status: !status }];
            }
        });
    }

    async function handleSendTasks() {
        try {
            await api.put("/aluno/tarefas", {
                tasks,
            });
            refresh((prev: any) => !prev)
            close(false)
        } catch (error) {
            return alert("Houve um problema ao atualizar as tarefas.")
        }

        console.log(tasks);
    }

    return (
        <ContainerTasks>
            <List>
                <Subtitle>Tarefas</Subtitle>
                {data.map((el: ITask) => (
                    <Item key={el.id}>
                        {el.taskname}
                        <Status
                            onChange={() => handleTicktask(el.id, el.status)}
                            type="checkbox"
                            checked={el.status}
                            disabled
                        />
                    </Item>
                ))}
                <ButtonEdit disabled onClick={handleSendTasks} className="btn btn-success">
                    Salvar
                </ButtonEdit>
            </List>
        </ContainerTasks>
    );
}