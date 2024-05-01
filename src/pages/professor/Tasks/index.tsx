import { useEffect, useState } from "react";
import { ButtonAddTask, ContainerAddTask, MainContent, Subtitle } from "./style";
import {Plus} from '@phosphor-icons/react'
import { Modal } from "../../../components/Modal/Modal";
import { FormAddTask } from "./Components/FormAddTask";
import { api } from "../../../api";
import { ActualTaskList } from "./Components/ActualTaskList";
import { PastTasks } from "./Components/PastTasks";


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
                    content={<FormAddTask setModalIsOpen={setModalIsOpen} />}
                    size='large'
                    setModalIsOpen={setModalIsOpen}
                />
                :null
            }
        </ContainerAddTask>
            <ActualTaskList />
            <PastTasks />
       </MainContent>
    )
}