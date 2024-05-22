import { useEffect, useState } from "react";
import { api } from "../../../../../api";
import { ContainerPastTasks, Message, Subtitle, Tabela } from "./style";
import ProgressBar from "@ramonak/react-progress-bar";
import { Modal } from "../../../../../components/Modal/Modal";
import { ShowTaskList } from "../ActualTaskList/components";

interface ITask {
    groupId: string;
    id: string;
    status: boolean;
    taskname: string;
}

interface IAdvisor {
    cpf:string
    createdAt:string
    email:string
    id:string
    name:string
    role:string
}

interface IGroupTask {
    advisorId: string;
    dueDate: string;
    id: string;
    studentId: string;
    tasks: ITask[];
    advisor: IAdvisor;
}

export function PastTasks() {
    const [groupTasks, setGroupTasks] = useState<IGroupTask[]>([]);
    const [pastTasks, setPastTasks] = useState<IGroupTask[]>([]);
    const [modalInvites, setModalInvitesIsOpen] = useState(false)
    const [clickedTasks, setClickedTasks] = useState<Array<ITask>>([])

    
    async function getAllTasks() {
        try {
            const { data } = await api.post("/aluno/tarefas/listar", {
                id: localStorage.getItem("user.id")
            });
            setGroupTasks(data.data);
        } catch (error) {
            alert("Houve um problema ao listar as tarefas.");
        }
    }

    function compareDate(dateReceived: string): string {
        const actualDate = new Date();
        const [year, month, day] = dateReceived.split("-").map(Number);
        const dataFornecidaObj = new Date(year, month - 1, day);

        if (actualDate > dataFornecidaObj) {
            return "A data atual é posterior à data fornecida.";
        } else if (actualDate < dataFornecidaObj) {
            return "A data atual é anterior à data fornecida.";
        } else {
            return "As datas são iguais.";
        }
    }

    function porcentTask(tasks: ITask[]): number {
        const doneCount = tasks.filter((el) => el.status).length;
        const percent = (doneCount * 100) / tasks.length;
        return percent;
    }

    function getPastTasks() {
        const past = groupTasks.filter((el) => compareDate(el.dueDate) === "A data atual é posterior à data fornecida.");
        setPastTasks(past);
    }

    function converterFormatoData(data: string): string {
        const [year, month, day] = data.split("-");
        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        getAllTasks();
    }, []);

    useEffect(() => {
        getPastTasks();
    }, [groupTasks]);

    return (
        <ContainerPastTasks>
            <Subtitle>Tarefas anteriores</Subtitle>
            {pastTasks.length > 0 ? (
                <Tabela>
                    <thead>
                        <tr>
                            <th>Aluno</th>
                            <th>Progresso</th>
                            <th>Entrega</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastTasks.map((el) => (
                            <tr key={el.id}>
                                <td>{el.advisor.name}</td>
                                <td  onClick={()=>{
                                                setClickedTasks(el.tasks)
                                                setModalInvitesIsOpen(true)
                                            }}>
                                    <ProgressBar
                                        completed={porcentTask(el.tasks)}
                                        bgColor="#00875F"
                                        customLabel={`${porcentTask(el.tasks)}%`}
                                        labelColor="#8D8D99"
                                        labelAlignment="outside"
                                    />
                                </td>
                                <td>{converterFormatoData(el.dueDate)}</td>
                            </tr>
                        ))}
                    </tbody>
                    {
                            (modalInvites)?
                            <Modal
                                content={<ShowTaskList data={clickedTasks} />}
                                size='large'
                                setModalIsOpen={setModalInvitesIsOpen}
                            />
                            :null
                        } 
                </Tabela>
            ) : (
                <Message>Não há nenhum registro de tarefa anterior</Message>
            )}
        </ContainerPastTasks>
    );
}