import { Plus } from "@phosphor-icons/react";
import { ButtonAddTask, ContainerContent, ContainerMenu } from "./style";
import { useState } from "react";
import { Modal } from "../../../components/Modal/Modal";
import { FormAddMeeting } from "./components/FormAddMeeting";
import { ActualMeetingsList } from "./components/ActualMeetings";
import { PastMeetingList } from "./components/PastMeetings";

export function ProfessorMeetingsPage(){
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return(
        <ContainerContent>
            <ContainerMenu>
                <ButtonAddTask
                     onClick={()=>{setModalIsOpen(true)}}
                     className="btn btn-success">
                     <Plus size={30}/>
                </ButtonAddTask>
                {
                (modalIsOpen)?
                <Modal
                    content={<FormAddMeeting setModalIsOpen={setModalIsOpen} />}
                    size='large'
                    setModalIsOpen={setModalIsOpen}
                />
                :null
            }
            </ContainerMenu>
            <ActualMeetingsList />
            <PastMeetingList />

        </ContainerContent>
    )
}