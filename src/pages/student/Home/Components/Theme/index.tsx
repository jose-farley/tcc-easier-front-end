import { useState } from "react";
import { Student } from "../..";
import { Text, ButtonEdit, ContainerContent, ContainerDescription, ContainerTheme, Title } from "./style";
import {PencilSimpleLine} from '@phosphor-icons/react'
import { Modal } from "../../../../../components/Modal/Modal";
import { FormAddDescription } from "../FormAddDescription";
import { FormAddTheme } from "../FormAddTheme";


interface props {
    theme:string 
    description:string
    refresh(data:boolean):void
}

export function Theme({theme,description, refresh}:props){
    const [modalTheme, setModalThemeIsOpen] = useState(false)
    const [modalDescription, setModalDescriptionIsOpen] = useState(false)
    return (
        <ContainerContent>
            <ContainerTheme>
                <Title>Tema</Title>
                <Text>{theme}</Text>
                <ButtonEdit onClick={()=>{setModalThemeIsOpen(true)}} className="btn btn-success"><PencilSimpleLine /></ButtonEdit>
            </ContainerTheme>
           { 
                (modalTheme)?
                    <Modal
                        content={<FormAddTheme closeModal={setModalThemeIsOpen} refresh={refresh}  />}
                        size='large'
                        setModalIsOpen={setModalThemeIsOpen}
                    />
                    :null
            }

            <ContainerDescription>
                <Title>Descrição</Title>
                <Text>{description}</Text>
                <ButtonEdit onClick={()=>{setModalDescriptionIsOpen(true)}} className="btn btn-success"><PencilSimpleLine /></ButtonEdit>
            </ContainerDescription>
            { 
                (modalDescription)?
                    <Modal
                        content={<FormAddDescription closeModal={setModalDescriptionIsOpen} refresh={refresh} />}
                        size='large'
                        setModalIsOpen={setModalDescriptionIsOpen}
                    />
                    :null
            }
        </ContainerContent>
    )
}