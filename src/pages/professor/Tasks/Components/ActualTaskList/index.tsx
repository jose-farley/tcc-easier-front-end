import { useContext, useEffect, useState } from "react";
import { ContainerActualTasks, Message, Subtitle, Tabela } from "./style";
import ProgressBar from "@ramonak/react-progress-bar";
import { api } from "../../../../../api";
import { Modal } from "../../../../../components/Modal/Modal";
import { ShowTaskList } from "./components";
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


export function ActualTaskList() {
    const [actualTasks, setActualTasks] = useState<IGroupTask[]>([]);
    const [groupTasks, setGroupTasks] = useState<IGroupTask[]>([]);
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

    function getActualTasks() {
        const actual = groupTasks.filter(
            (el) => compareDate(el.dueDate) === "A data atual é anterior à data fornecida."
        );
        setActualTasks(actual);
    }

    function porcentTask(tasks: ITask[]): number {
        const doneCount = tasks.filter((el) => el.status).length;
        const percent = (doneCount * 100) / tasks.length;
        return parseFloat(percent.toFixed(1));
    }

    function converterFormatoData(data: string): string {
        const [year, month, day] = data.split("-");
        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        getAllTasks();
    }, [refreshTasks]);

    useEffect(() => {
        getActualTasks();
    }, [groupTasks]);

    return (
        <ContainerActualTasks>
            <Subtitle>Tarefas atuais</Subtitle>
            {groupTasks.length > 0 ? (
                actualTasks.length > 0 ? (
                    <Tabela>
                        <thead>
                            <tr>
                                <th>Aluno</th>
                                <th>Progresso</th>
                                <th>Entrega</th>
                            </tr>
                        </thead>
                        <tbody>
                            {actualTasks.map((el) => (
                                <tr key={el.id}>
                                    <td>{el.student.name}</td>
                                    <td  onClick={()=>{
                                                setGroupId(el.id)
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
                                content={<ShowTaskList groupId={groupId} data={clickedTasks} closeModal={setModalInvitesIsOpen} />}
                                size='large'
                                setModalIsOpen={setModalInvitesIsOpen}
                            />
                            :null
                        } 
                    </Tabela>
                ) : (
                    <Message>Não há nenhuma tarefa atual.</Message>
                )
            ) : <Message>Não há nenhuma tarefa atual.</Message>}
        </ContainerActualTasks>
    );
}