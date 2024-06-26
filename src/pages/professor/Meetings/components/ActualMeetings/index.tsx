import { useContext, useEffect, useState } from "react";
import { ContainerActualTasks, Message, Subtitle, Tabela } from "./style";
import { api } from "../../../../../api";
import { Modal } from "../../../../../components/Modal/Modal";
import { FormEditMeeting } from "./components";
import { AuthContext } from "../../../../../context/authentication";


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

export function ActualMeetingsList() {
    const [listMeetings, setListMeetings] = useState<Array<Meeting>>([]);
    const [actualMeetingList, setActualMeetingList] = useState<Array<Meeting>>([]);
    const [editMeeting, setEditMeeting] = useState<Meeting>();
    const [refresh, setRefresh] = useState<boolean>(false); // Estado para forçar atualização da lista
    const [modalEdit, setModalEdit] = useState(false)

    const {refreshMeeting, setRefreshMeetings} = useContext(AuthContext)

    async function getAllMeetings() {
        try {
            const { data } = await api.post("/professor/reunioes/listar", {
                id: localStorage.getItem("user.id")
            });
            setListMeetings(data.data);
        } catch (error) {
            alert("Houve um problema ao listar as reuniões atuais.");
        }
    }

    function compareDateTime(targetDateTime: string) {
        const now = new Date();
        const targetDate = new Date(targetDateTime);
        return now < targetDate;
    }

    useEffect(() => {
        getAllMeetings();
    }, [refreshMeeting]); // Atualizar lista quando o estado 'refresh' mudar

    useEffect(() => {
       
        // Filtrar reuniões atuais quando a lista de reuniões mudar
        const actualMeetings = listMeetings.filter((el) => compareDateTime(el.due));
       

        setActualMeetingList(actualMeetings);
    }, [listMeetings]); // Atualizar lista de reuniões atuais quando 'listMeetings' mudar

    function formatDateTime(isoDateTime: string) {
        const date = new Date(isoDateTime);
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${hours}:${minutes} - ${day}/${month}/${year}`;
    }
   
    function handleClickMeeting(id:string){
        let result = actualMeetingList.find(el => el.id === id);
        setEditMeeting(result)
    }

    if(actualMeetingList.length > 0){
        return (
                <ContainerActualTasks>
                    <Subtitle>Reuniões atuais</Subtitle>
                    <Tabela>
                        <thead>
                            <tr>
                            <th>Aluno</th>
                                <th>Local</th>
                                <th>Horário e data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {actualMeetingList.map(el =>{
                                return (
                                    <tr key={el.id} onClick={()=>{
                                        handleClickMeeting(el.id)
                                        setModalEdit(true)}}>
                                        <td>{el.student.name}</td>
                                        <td>{el.local}</td>
                                        <td>{formatDateTime(el.due)}</td>
                                    </tr> 
                                )
                            })}
                        </tbody>
                    </Tabela>
                    {
                        (modalEdit)?
                        <Modal
                            content={<FormEditMeeting refresh={setRefreshMeetings} meeting={editMeeting!} setModalIsOpen={setModalEdit}  />}
                            size='large'
                            setModalIsOpen={setModalEdit}
                        />
                        :null
                  }

                </ContainerActualTasks>
            )
    }else{
        return (
            <ContainerActualTasks>
                <Subtitle>Reuniões Atuais</Subtitle>
                <Message>Nenhuma reunião atual encontrada.</Message>   
            </ContainerActualTasks>
        )
    }
}