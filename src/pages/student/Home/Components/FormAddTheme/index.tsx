import { useState } from "react";
import { ButtonEdit, MainContent, PlaceText, Subtitle } from "./style";
import { api } from "../../../../../api";
import { boolean } from "zod";


interface props {
    closeModal(data:boolean):void
    refresh(data:boolean):void
}

export function FormAddTheme({closeModal, refresh}:props){

    const [theme, setTheme] = useState("")
    async function handleAddTheme(){
        try {
            await api.put("/aluno/tema", {
                id:localStorage.getItem("user.id"),
                theme: theme 

            })
            refresh((prev: any) => !prev)
            closeModal(false)
        } catch (error) {
            return alert("Houve um problema ao adicionar o tema.")
        }
    }

    return (
        <MainContent>
            <Subtitle>Insira o novo tema do seu trabalho.</Subtitle>
            <PlaceText cols={6}  value={theme} onChange={(el)=>{setTheme(el.target.value)}} className="form-control" />
            <ButtonEdit onClick={handleAddTheme}  className="btn btn-success">Salvar</ButtonEdit>
        </MainContent>
    )
}