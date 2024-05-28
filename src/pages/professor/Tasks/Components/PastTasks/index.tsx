import { useContext, useEffect, useState } from "react";
import { api } from "../../../../../api";
import { ContainerPastTasks, Message, Subtitle, Tabela } from "./style";
import ProgressBar from "@ramonak/react-progress-bar";
import { Modal } from "../../../../../components/Modal/Modal";
import { ShowTaskList } from "../ActualTaskList/components";
import { AuthContext } from "../../../../../context/authentication";

interface ITask {
    groupId: string;
    id: string;
    status: boolean;
    taskname: string;
}

interface IStudent {
    name: string;
}

interface IGroupTask {
    advisorId: string;
    dueDate: string;
    id: string;
    studentId: string;
    tasks: ITask[];
    student: IStudent;
}

export function PastTasks() {
    const [groupTasks, setGroupTasks] = useState<IGroupTask[]>([]);
    const [pastTasks, setPastTasks] = useState<IGroupTask[]>([]);
    const [modalInvites, setModalInvitesIsOpen] = useState(false)
    const [clickedTasks, setClickedTasks] = useState<Array<ITask>>([])
    const [groupId, setGroupId] = useState("")
    const {refreshTasks} = useContext(AuthContext)

    async function getAllTasks() {
        try {
            const { data } = await api.post("/professor/tarefas/listar", {
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
    }, [refreshTasks]);

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
                                <td>{el.student.name}</td>
                                <td  onClick={()=>{
                                                setGroupId(el.id)
                                                setClickedTasks(el.tasks)
                                                setModalInvitesIsOpen(true)
                                            }}>
                                    <ProgressBar
                                        completed={porcentTask(el.tasks)}
                                        bgColor="#a2a336"
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
                                content={<ShowTaskList data={clickedTasks} groupId={groupId} closeModal={setModalInvitesIsOpen} />}
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