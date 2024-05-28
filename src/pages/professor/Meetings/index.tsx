import { Plus } from "@phosphor-icons/react";
import { ButtonAddTask, ContainerContent, ContainerMenu } from "./style";
import { useEffect, useState } from "react";
import { Modal } from "../../../components/Modal/Modal";
import { FormAddMeeting } from "./components/FormAddMeeting";
import { ActualMeetingsList } from "./components/ActualMeetings";
import { PastMeetingList } from "./components/PastMeetings";

export function ProfessorMeetingsPage() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        // Trigger a re-render of child components when `refresh` changes
    }, [refresh]);

    return (
        <ContainerContent>
            <ContainerMenu>
                <ButtonAddTask
                    onClick={() => { setModalIsOpen(true); }}
                    className="btn btn-success">
                    <Plus size={30} />
                </ButtonAddTask>
                {modalIsOpen && (
                    <Modal
                        content={<FormAddMeeting setModalIsOpen={setModalIsOpen} refresh={setRefresh} />}
                        size='large'
                        setModalIsOpen={setModalIsOpen}
                    />
                )}
            </ContainerMenu>
            <ActualMeetingsList  />
            <PastMeetingList  />
        </ContainerContent>
    );
}