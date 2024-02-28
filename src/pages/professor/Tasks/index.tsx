import { useState } from "react";
import { ButtonAddTask, ContainerAddTask, MainContent } from "./style";
import {Plus} from '@phosphor-icons/react'
import { Modal } from "../../../components/Modal/Modal";
import { FormAddTask } from "./Components/FormAddTask";
export function ProfessorTasksPage(){

    const [modalIsOpen, setModalIsOpen] = useState(false)


    return (
       <MainContent>
        <ContainerAddTask>
            <ButtonAddTask 
                onClick={()=>{setModalIsOpen(true)}}
                className="btn btn-success">
                <Plus size={30}/>
            </ButtonAddTask>
            {
                (modalIsOpen)?
                <Modal
                    content={<FormAddTask />}
                    size='large'
                    setModalIsOpen={setModalIsOpen}
                />
                :null
            }
        </ContainerAddTask>

        
       </MainContent>
    )
}